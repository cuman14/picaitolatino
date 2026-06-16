import fs from 'fs';
import path from 'path';

const menuPath = path.resolve('src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// Find the first tostadas-desayuno category
const categoryStart = content.indexOf('id: "tostadas-desayuno"');
if (categoryStart === -1) { console.error('Category not found'); process.exit(1); }

// Find the start of the items array
const itemsArrayStart = content.indexOf('items: [', categoryStart);
if (itemsArrayStart === -1) { console.error('items: [ not found'); process.exit(1); }

// Find the original items array end using balanced braces
// The items array starts at the [ after "items: ["
const bracketStart = content.indexOf('[', itemsArrayStart);
let depth = 0;
let itemsArrayEnd = -1;
let inString = false;
let stringChar = null;

for (let i = bracketStart; i < content.length; i++) {
  const ch = content[i];
  
  if (inString) {
    if (ch === '\\') { i++; continue; }
    if (ch === stringChar) inString = false;
    continue;
  }
  
  if (ch === '"' || ch === "'" || ch === '`') {
    inString = true;
    stringChar = ch;
    continue;
  }
  
  if (ch === '[') depth++;
  else if (ch === ']') {
    depth--;
    if (depth === 0) {
      itemsArrayEnd = i;
      break;
    }
  }
}

if (itemsArrayEnd === -1) { console.error('Could not find matching ]'); process.exit(1); }

// Find the end of the category object (the }, that closes the category)
// After the items array, we need to find the }, that closes the category
const afterItems = content.substring(itemsArrayEnd + 1);
// Find the first }, that closes the category object
// The category is: { id: "...", name: {...}, items: [...] }
// After items array, we need to find the matching } for this category
// Find the { that starts the category
const categoryBraceStart = content.lastIndexOf('{', categoryStart);
if (categoryBraceStart === -1) { console.error('Category brace not found'); process.exit(1); }

// Find the matching } for the category brace
inString = false;
stringChar = null;
depth = 0;
let categoryEnd = -1;
for (let i = categoryBraceStart; i < content.length; i++) {
  const ch = content[i];
  
  if (inString) {
    if (ch === '\\') { i++; continue; }
    if (ch === stringChar) inString = false;
    continue;
  }
  
  if (ch === '"' || ch === "'" || ch === '`') {
    inString = true;
    stringChar = ch;
    continue;
  }
  
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) {
      categoryEnd = i;
      break;
    }
  }
}

if (categoryEnd === -1) { console.error('Could not find category end'); process.exit(1); }

console.log('Category brace start:', categoryBraceStart, 'Category end:', categoryEnd);
console.log('Items array start:', itemsArrayStart, 'Items array end:', itemsArrayEnd);

// Extract the new items (what's inside the items array)
const itemsContent = content.substring(bracketStart + 1, itemsArrayEnd).trim();
console.log('Items count (by counting {):', (itemsContent.match(/{/g) || []).length);

// Build proper replacement for the category
const properCategory = `{\n    id: "tostadas-desayuno",
    name: { es: "TOSTADAS DE DESAYUNO", en: "BREAKFAST TOASTS" },
    items: [${itemsContent}\n    ]\n  }`;

// Replace the whole category
const before = content.substring(0, categoryBraceStart);
const after = content.substring(categoryEnd + 1);
content = before + properCategory + after;

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Fixed tostadas-desayuno category successfully!');
