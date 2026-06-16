import fs from 'fs';
import path from 'path';

const menuPath = path.resolve('src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// Define the new breakfast items array
const newBreakfastItems = [
  {
    name: { es: "Tostada con Aceite", en: "Toast with Olive Oil" },
    price: 1.2,
    secondaryPrice: 1.6,
    allergens: ["gluten"],
  },
  {
    name: { es: "Tostada de Tomate", en: "Tomato Toast" },
    price: 1.3,
    secondaryPrice: 1.7,
    allergens: ["gluten"],
  },
  {
    name: { es: "Tostada de Mantequilla y Mermelada", en: "Butter & Jam Toast" },
    description: { es: "Media / Entera", en: "Half / Whole" },
    price: 1.2,
    secondaryPrice: 1.6,
    allergens: ["gluten", "lacteos"],
  },
  {
    name: { es: "Tostada de Mermelada", en: "Jam Toast" },
    description: { es: "Fresa / Melocotón", en: "Strawberry / Peach" },
    price: 1.2,
    secondaryPrice: 1.5,
    allergens: ["gluten"],
  },
  {
    name: { es: "Tostada de Jamón Cocido o Pavo", en: "York Ham or Turkey Toast" },
    price: 1.7,
    secondaryPrice: 2.0,
    allergens: ["gluten"],
  },
  {
    name: { es: "Tostada de Jamón Ibérico", en: "Iberian Ham Toast" },
    price: 2.5,
    secondaryPrice: 3.1,
    allergens: ["gluten"],
  },
  {
    name: { es: "Paté Ibérico (Ración)", en: "Iberian Pâté (Portion)" },
    price: 1.9,
    secondaryPrice: 2.9,
  },
  {
    name: { es: "Crema de York (Ración)", en: "York Cream (Portion)" },
    price: 1.8,
    secondaryPrice: 2.6,
    allergens: ["lacteos"],
  },
  {
    name: { es: "Extra Huevo", en: "Extra Egg" },
    price: 1.0,
    allergens: ["huevo"],
  },
  {
    name: { es: "Extra Queso en loncha", en: "Extra Cheese slice" },
    price: 0.6,
    allergens: ["lacteos"],
  },
  {
    name: { es: "Extra de Tomate", en: "Extra Tomato" },
    price: 0.5,
  },
  {
    name: { es: "Croissant con Jamón Cocido", en: "Croissant with York Ham" },
    price: 1.5,
    allergens: ["gluten", "lacteos", "huevo"],
  },
  {
    name: { es: "Napolitana de Crema", en: "Cream Pastry" },
    price: 1.5,
    allergens: ["gluten", "lacteos", "huevo"],
  },
  {
    name: { es: "Napolitana de Chocolate", en: "Chocolate Pastry" },
    price: 1.5,
    allergens: ["gluten", "lacteos", "huevo"],
  }
];

// Helper to format item object
function fmtItem(item) {
  let s = '      {\n';
  s += `        name: { es: "${item.name.es}", en: "${item.name.en}" },\n`;
  if (item.description) {
    s += `        description: { es: "${item.description.es}", en: "${item.description.en}" },\n`;
  }
  s += `        price: ${item.price.toFixed(1).replace('.0', '.0')},\n`;
  if (item.secondaryPrice !== undefined) {
    s += `        secondaryPrice: ${item.secondaryPrice.toFixed(1).replace('.0', '.0')},\n`;
  }
  if (item.allergens && item.allergens.length) {
    s += `        allergens: [${item.allergens.map(a => `"${a}"`).join(', ')}],\n`;
  }
  s += '      }';
  return s;
}

// Find "tostadas-desayuno" category block and replace its items
const startIdx = content.indexOf('id: "tostadas-desayuno"');
if (startIdx === -1) {
  console.error('Could not find tostadas-desayuno category');
  process.exit(1);
}

const itemsStartMarker = 'items: [';
const itemsStartIndex = content.indexOf(itemsStartMarker, startIdx);
const itemsEndIndex = content.indexOf(']', itemsStartIndex);

const formattedItems = newBreakfastItems.map(fmtItem).join(',\n');
const replacement = `items: [\n${formattedItems}\n    ]`;

content = content.slice(0, itemsStartIndex) + replacement + content.slice(itemsEndIndex + 1);

// Update "Café manchao" to "Café manchado" and price to 1.4
const oldCafeBlock = `      {
        name: { es: "Café manchao", en: "Stained Coffee" },
        price: 1.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      }`;

const newCafeBlock = `      {
        name: { es: "Café manchado", en: "Stained Coffee" },
        price: 1.4,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      }`;

content = content.replace(oldCafeBlock, newCafeBlock);

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Successfully updated breakfast items and Café manchado in menu.ts!');
