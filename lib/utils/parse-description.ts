/**
 * Parse the raw description string from generated-products.json
 * The format is: description ***SPLIT*** brandInfo ***SPLIT*** ingredients ***SPLIT*** directions ***SPLIT*** manufacturer
 */
export interface ParsedProductDescription {
  description: string;
  brandInfo: string;
  ingredients: string;
  directions: string;
  manufacturer: string;
}

export function parseProductDescription(raw: string): ParsedProductDescription {
  // The delimiter in the data
  const DELIMITER = '***SPLIT***';
  const parts = raw.split(DELIMITER).map(p => p.trim());

  return {
    description: parts[0] || '',
    brandInfo: parts[1] || '',
    ingredients: parts[2] || '',
    directions: parts[3] || '',
    manufacturer: parts[4] || '',
  };
}

/**
 * Clean HTML entities and normalize whitespace in a text string
 */
export function cleanText(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}
