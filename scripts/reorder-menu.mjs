import fs from 'fs';
import path from 'path';

const menuPath = path.resolve('src/data/menu.ts');
const fileContent = fs.readFileSync(menuPath, 'utf8');

// Find the start of the menuData array
const arrayStartMarker = 'export const menuData: Category[] = [';
const startIndex = fileContent.indexOf(arrayStartMarker);
if (startIndex === -1) {
  console.error('Could not find menuData array start');
  process.exit(1);
}

const beforeArray = fileContent.slice(0, startIndex + arrayStartMarker.length);
const arrayContentAndAfter = fileContent.slice(startIndex + arrayStartMarker.length);

// Parse category blocks inside the array
// We find balanced braces at the top level of the array
const categories = [];
let braceCount = 0;
let currentBlock = '';
let inString = false;
let stringChar = '';

for (let i = 0; i < arrayContentAndAfter.length; i++) {
  const char = arrayContentAndAfter[i];
  
  // Basic string literal escape handling
  if (inString) {
    if (char === '\\') {
      currentBlock += char + arrayContentAndAfter[++i];
      continue;
    }
    if (char === stringChar) {
      inString = false;
    }
    currentBlock += char;
    continue;
  }
  
  if (char === '"' || char === "'" || char === '`') {
    inString = true;
    stringChar = char;
    currentBlock += char;
    continue;
  }
  
  if (char === '{') {
    if (braceCount === 0) {
      // Start of a category block
      currentBlock = '{';
    } else {
      currentBlock += char;
    }
    braceCount++;
    continue;
  }
  
  if (char === '}') {
    braceCount--;
    currentBlock += char;
    if (braceCount === 0) {
      // End of a category block
      categories.push(currentBlock);
      currentBlock = '';
    }
    continue;
  }
  
  if (braceCount > 0) {
    currentBlock += char;
  } else {
    // If we hit the closing bracket of the main array, we are done
    if (char === ']') {
      break;
    }
  }
}

console.log(`Parsed ${categories.length} categories.`);

// Parse IDs from each category block
const categoryList = categories.map(block => {
  const match = block.match(/id:\s*"([^"]+)"/);
  return {
    id: match ? match[1] : null,
    text: block
  };
});

console.log('Category IDs found:', categoryList.map(c => c.id));

// Function to parse balanced item blocks in the items list of bebidas
function parseItems(itemsText) {
  const items = [];
  let braceCount = 0;
  let currentBlock = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < itemsText.length; i++) {
    const char = itemsText[i];
    
    if (inString) {
      if (char === '\\') {
        currentBlock += char + itemsText[++i];
        continue;
      }
      if (char === stringChar) {
        inString = false;
      }
      currentBlock += char;
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      currentBlock += char;
      continue;
    }
    
    if (char === '{') {
      if (braceCount === 0) {
        currentBlock = '{';
      } else {
        currentBlock += char;
      }
      braceCount++;
      continue;
    }
    
    if (char === '}') {
      braceCount--;
      currentBlock += char;
      if (braceCount === 0) {
        items.push(currentBlock);
        currentBlock = '';
      }
      continue;
    }
    
    if (braceCount > 0) {
      currentBlock += char;
    }
  }
  return items;
}

// Find bebidas category
const bebidasCategory = categoryList.find(c => c.id === 'bebidas');
if (!bebidasCategory) {
  console.error('Could not find beverages (bebidas) category');
  process.exit(1);
}

// Parse items of beverages
const itemsStartIndex = bebidasCategory.text.indexOf('items: [');
const itemsEndIndex = bebidasCategory.text.lastIndexOf(']');
const itemsText = bebidasCategory.text.slice(itemsStartIndex + 8, itemsEndIndex);

const parsedItems = parseItems(itemsText);
console.log(`Found ${parsedItems.length} items inside beverages (bebidas).`);

const cafesItems = [];
const otherItems = [];

for (const item of parsedItems) {
  if (item.includes('subcategory: "Cafetería"') || item.includes('subcategory: "Infusiones y Zumos"')) {
    cafesItems.push(item);
  } else {
    otherItems.push(item);
  }
}

console.log(`Split into: ${cafesItems.length} cafes/infusions, ${otherItems.length} other beverages.`);

// Build new categories
const cafesBlock = `  {
    id: "cafes-infusiones",
    name: { es: "CAFÉS E INFUSIONES", en: "COFFEES & TEAS" },
    items: [
${cafesItems.map(item => '      ' + item.trim()).join(',\n')}
    ],
  }`;

const newBebidasBlock = `  {
    id: "bebidas",
    name: { es: "BEBIDAS", en: "DRINKS" },
    items: [
${otherItems.map(item => '      ' + item.trim()).join(',\n')}
    ],
  }`;

// Map of categories
const categoryMap = {};
for (const cat of categoryList) {
  categoryMap[cat.id] = cat.text.trim();
}

categoryMap['bebidas'] = newBebidasBlock.trim();
categoryMap['cafes-infusiones'] = cafesBlock.trim();

// Target order:
const targetOrder = [
  'tostadas-desayuno',
  'cafes-infusiones',
  'especiales',
  'empezar',
  'otros',
  'raciones',
  'tostas',
  'mini-tortillas',
  'postres',
  'bebidas',
  'combinados-chupitos',
  'vinos'
];

const orderedBlocks = targetOrder.map(id => {
  const block = categoryMap[id];
  if (!block) {
    throw new Error(`Category ${id} not found!`);
  }
  return '  ' + block;
});

// Re-assemble the file
const newFileContent = beforeArray + '\n' + orderedBlocks.join(',\n') + '\n];\n';

fs.writeFileSync(menuPath, newFileContent, 'utf8');
console.log('Successfully reordered and split menu categories in menu.ts!');
