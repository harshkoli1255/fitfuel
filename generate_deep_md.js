import fs from 'fs';

const media = JSON.parse(fs.readFileSync('reference-audit/media.json', 'utf8'));
const anims = JSON.parse(fs.readFileSync('reference-audit/animations.json', 'utf8'));

let mediaMd = `# FitFuel Deep Media Audit\n\n`;
let animMd = `# FitFuel Deep Animation Audit\n\n`;

// Unique media
const uniqueMedia = [...new Map(media.map(item => [item.src, item])).values()];
mediaMd += `## Found ${uniqueMedia.length} unique media items across crawled routes.\n\n`;
mediaMd += `| Route | Type | Dimensions | Source |\n|-------|------|------------|--------|\n`;
uniqueMedia.forEach(m => {
  mediaMd += `| ${m.route.replace('https://nutristar.in', '') || '/'} | ${m.type} | ${m.width}x${m.height} | [Link](${m.src?.substring(0, 50)}...) |\n`;
});

fs.writeFileSync('reference-audit/media.md', mediaMd);

// Unique animations
const uniqueAnims = [...new Map(anims.map(item => [item.selector, item])).values()];
animMd += `## Found ${uniqueAnims.length} unique CSS transitions.\n\n`;
animMd += `| Route | Selector | Transition | Duration |\n|-------|----------|------------|----------|\n`;
uniqueAnims.forEach(a => {
  animMd += `| ${a.route.replace('https://nutristar.in', '') || '/'} | \`${a.selector.replace(/\n/g, ' ')}\` | ${a.transition} | ${a.duration} |\n`;
});

fs.writeFileSync('reference-audit/animations.md', animMd);
console.log("Deep audit markdown files created.");
