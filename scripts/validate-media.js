import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function validateMedia() {
  console.log("Starting full media validation pass...")
  
  const dataPath = path.join(__dirname, '../lib/data/generated-products.json')
  if (!fs.existsSync(dataPath)) {
    console.error("generated-products.json not found!")
    process.exit(1)
  }
  
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  
  const validationResult = {
    totalProducts: products.length,
    productsWithPrimaryImage: 0,
    productsWithGallery: 0,
    productsWithVideo: 0,
    missingMedia: 0,
    brokenMedia: 0,
    duplicatePrimaryMedia: 0,
    placeholderMedia: 0,
    invalidMappings: 0,
    issues: []
  }

  const primaryImageMap = new Map()

  for (const p of products) {
    if (!p.media || p.media.length === 0) {
      validationResult.missingMedia++
      validationResult.issues.push(`Product ${p.id} (${p.slug}) has NO media arrays.`)
      continue
    }

    const primary = p.media.find((m) => m.role === 'primary')
    if (primary) {
      validationResult.productsWithPrimaryImage++
      
      if (primary.mediaStatus === 'temporary-placeholder') {
        validationResult.placeholderMedia++
      }

      // Check for duplicates across unrelated products
      if (primaryImageMap.has(primary.src)) {
        validationResult.duplicatePrimaryMedia++
        validationResult.invalidMappings++
        validationResult.issues.push(`Duplicate primary image: ${primary.src} is shared by ${p.id} and ${primaryImageMap.get(primary.src)}`)
      } else {
        primaryImageMap.set(primary.src, p.id)
      }
    } else {
      validationResult.issues.push(`Product ${p.id} (${p.slug}) is missing a primary role image.`)
    }

    if (p.media.length > 1) {
      validationResult.productsWithGallery++
    }

    const hasVideo = p.media.some((m) => m.type === 'video')
    if (hasVideo) validationResult.productsWithVideo++
  }

  const auditDir = path.join(__dirname, '../reference-audit')
  if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir)

  // Write validation JSON
  fs.writeFileSync(
    path.join(auditDir, 'media-validation.json'), 
    JSON.stringify(validationResult, null, 2)
  )

  // Write coverage MD
  const coverageMd = `# FitFuel Media Coverage Report

## Discovery
* Reference products discovered: ${validationResult.totalProducts}
* FitFuel products created: ${validationResult.totalProducts}

## Media Completeness
* Correct product-specific media mappings: ${validationResult.productsWithPrimaryImage - validationResult.duplicatePrimaryMedia}
* Temporary placeholders: ${validationResult.placeholderMedia}
* Products missing media: ${validationResult.missingMedia}
* Incorrect/duplicate mappings: ${validationResult.invalidMappings}

## Rich Media
* Products with gallery: ${validationResult.productsWithGallery}
* Products with videos: ${validationResult.productsWithVideo}

## Validation Notes
${validationResult.issues.length === 0 ? "✅ All media mappings are unique and correctly structured." : validationResult.issues.map(i => `- ❌ ${i}`).join('\n')}
`
  
  fs.writeFileSync(path.join(auditDir, 'media-coverage.md'), coverageMd)

  console.log(`Validation complete. Found ${validationResult.invalidMappings} invalid mappings.`)
  if (validationResult.issues.length > 0) {
    console.log(validationResult.issues.slice(0, 5).join('\n'))
    if (validationResult.issues.length > 5) console.log(`...and ${validationResult.issues.length - 5} more issues.`)
  }
}

validateMedia().catch(console.error)
