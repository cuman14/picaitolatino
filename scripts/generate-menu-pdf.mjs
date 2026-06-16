/**
 * generate-menu-pdf.mjs
 * ────────────────────────────────────────────────────────────────────────────
 * Renderiza `src/data/menu.ts` → `public/menu-print.pdf` (A4, 300 DPI, 7 páginas).
 *
 * Ejecución: `node --experimental-strip-types scripts/generate-menu-pdf.mjs`
 *
 * CAMPOS DE menu.ts QUE USA ESTE SCRIPT (fuente de fidelidad)
 *   item.name.es              → nombre del plato (es local, no en)
 *   item.description?.es      → descripción (opcional)
 *   item.price                → precio principal   (number; string tolerado)
 *   item.secondaryPrice       → segundo precio     (number; string tolerado)
 *                                formato salida: "1,20€ / 1,60€"
 *   item.allergens[]          → iconos PNG (public/alergenos/{key}.png)
 *   item.subcategory          → agrupación dentro de la categoría
 *   item.special              → true ⇒ nombre en color spice (#6b1f2a)
 *   category.name.es          → encabezado de sección
 *   category.id               → branch de layout (ver abajo)
 *
 * ASUNCIONES Y LAYOUT
 *   1. Idioma fijo: español. El script NO itera locales; el PDF es una sola tirada.
 *   2. Subcategories paralelas (misma Y en columnas opuestas) SÓLO se aplican a:
 *        - tostadas-desayuno:  Tostadas (izq) | Dulces (der)
 *                              Extras         ⇒ apilado bajo Tostadas (izq)
 *        - cafes-infusiones:   Cafetería (izq) | Infusiones y Zumos (der)
 *      Si renombras estas subcategorías en menu.ts, el layout se desbalancea.
 *      Resto de categorías con subcategorías: balance left/right por altura.
 *      Categorías sin subcategorías: balance left/right por altura.
 *   3. price: hoy todos los precios en menu.ts son `number`. El script acepta
 *      también `string` (formato "1,30" o "1.30") para no romper cuando
 *      llegue el CMS (ver `formatPrice`).
 *
 * RECURSOS EXTERNOS
 *   public/fonts/CormorantGaramond-{Regular,Bold,SemiBold,Light}.ttf
 *   public/alergenos/{gluten,lacteos,huevo,...}.png
 *   public/logo.png | public/logo.jpg  (cabeçera verde #0b773e, ~40px)
 *
 * TRABAJO PENDIENTE (work item Plane)
 *   Refactorizar `isFirst/isLast/isLeftSub` (líneas ~346,394-398) a un
 *   mecanismo basado en ID de subcategoría o array explícito de izq/der,
 *   desacoplando la estructura del PDF del nombre legible de la subcategoría.
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { menuData } from '../src/data/menu.ts';

// Color Palette from website - RGB values for PDFKit
// CMYK-approximated colors for print (pdfkit uses RGB but print shops convert well)
// Primary green: C=91 M=0 Y=75 K=59  ≈ #0d4a2c
// Accent gold:   C=0 M=25 Y=100 K=25 ≈ #c9a227  (NOT for prices)
// Spice/wine:    C=30 M=100 Y=100 K=30 ≈ #6b1f2a (good for prices)
// Black:         C=60 M=40 Y=40 K=100 ≈ #222222 (text)
// Dark gray:     C=60 M=50 Y=50 K=80 ≈ #333333
const COLORS = {
  primary: '#0d4a2c',
  primaryDark: '#062d1a',
  primaryLight: '#1a6340',

  accent: '#c9a227',
  accentText: '#8b6914',
  accentDark: '#6b4f0f',
  accentLight: '#e8d5a3',

  spice: '#6b1f2a',
  spiceLight: '#a03040',

  black: '#111111',
  darkGray: '#333333',
  mediumGray: '#595959',
  lightGray: '#cccccc',

  bgPaper: '#faf8f5',
  bgCream: '#f5f2ed',
};

// Font paths
const FONT_DIR = path.join(process.cwd(), 'public', 'fonts');
const FONTS = {
  regular: path.join(FONT_DIR, 'CormorantGaramond-Regular.ttf'),
  bold: path.join(FONT_DIR, 'CormorantGaramond-Bold.ttf'),
  semibold: path.join(FONT_DIR, 'CormorantGaramond-SemiBold.ttf'),
  light: path.join(FONT_DIR, 'CormorantGaramond-Light.ttf'),
};

const ALLERGEN_ICONS = {
  gluten: 'G', lacteos: 'L', huevo: 'H', soja: 'S',
  pescado: 'P', crustaceos: 'C', frutos_con_cascara: 'N', apio: 'A', sulfitos: 'SU',
};

function formatPrice(price) {
  if (price === null || price === undefined) return '';
  const num = typeof price === 'string'
    ? parseFloat(price.replace(',', '.'))
    : price;
  if (!Number.isFinite(num)) return String(price);
  return `${num.toFixed(2).replace('.', ',')}€`;
}

function setFillColor(doc, color) {
  doc.fillColor(color);
}

function setStrokeColor(doc, color) {
  doc.strokeColor(color);
}

// Print specifications - 300 DPI optimized
const MM_TO_PT = 2.83465;
const PAGE_WIDTH = 210 * MM_TO_PT;
const PAGE_HEIGHT = 297 * MM_TO_PT;
const MARGIN = 8 * MM_TO_PT;
const COLUMN_GAP = 5 * MM_TO_PT;
const COLUMN_WIDTH = (PAGE_WIDTH - (MARGIN * 2) - COLUMN_GAP) / 2;
const LEFT_COL_X = MARGIN;
const RIGHT_COL_X = MARGIN + COLUMN_WIDTH + COLUMN_GAP;
const PRICE_COL_WIDTH = 58;

// Font size conversion: px to pt at 300 DPI (1px = 0.24pt)
// 80px = 19.2pt, 55px = 13.2pt, 40px = 9.6pt, 35px = 8.4pt
const ITEM_GAP = 6; // Extra spacing between menu items

const FONT_SIZE = {
  sectionTitle: 19.2,  // 80px
  dishName: 13.2,      // 55px
  price: 11,           // ~46px
  description: 8.4,    // 35px
  subcategory: 10,     // ~42px
  allergen: 6,         // ~25px
};

function drawSectionHeader(doc, title, y) {
  const fullWidth = PAGE_WIDTH - (MARGIN * 2);
  doc.save();
  
  // Top decorative line
  doc.lineWidth(0.5);
  doc.moveTo(MARGIN, y);
  doc.lineTo(MARGIN + fullWidth, y);
  setStrokeColor(doc, COLORS.primary);
  doc.stroke();
  
  // Section title
  doc.font('Cormorant-Bold')
    .fontSize(FONT_SIZE.sectionTitle)
    .fillColor(COLORS.primaryDark)
    .text(title, MARGIN, y + 4, { width: fullWidth, align: 'center' });
  
  // Bottom decorative line
  doc.lineWidth(0.5);
  doc.moveTo(MARGIN, y + 26);
  doc.lineTo(MARGIN + fullWidth, y + 26);
  setStrokeColor(doc, COLORS.primary);
  doc.stroke();
  
  doc.restore();
  return y + 38;
}

function drawSubcategoryHeader(doc, title, x, y, colWidth) {
  doc.save();
  doc.font('Cormorant-SemiBold')
    .fontSize(FONT_SIZE.subcategory)
    .fillColor(COLORS.accent)
    .text(title, x, y, { width: colWidth });
  
  // Subtle underline
  const textWidth = doc.widthOfString(title);
  doc.lineWidth(0.3);
  doc.moveTo(x, y + 13);
  doc.lineTo(x + textWidth + 5, y + 13);
  setStrokeColor(doc, COLORS.accentLight);
  doc.stroke();
  
  doc.restore();
  return y + 16;
}

function drawDishItem(doc, item, x, y, colWidth, isSpecial = false) {
  doc.save();
  const nameWidth = colWidth - PRICE_COL_WIDTH - 4;
  
  // Dish name
  const nameColor = isSpecial ? COLORS.spice : COLORS.black;
  doc.font('Cormorant-Bold')
    .fontSize(FONT_SIZE.dishName)
    .fillColor(nameColor);
  
  doc.text(item.name.es, x, y, { width: nameWidth });
  const nameHeight = doc.heightOfString(item.name.es, { width: nameWidth });
  
  // Price — dark wine color (CMYK-friendly, high contrast on paper)
  const priceText = formatPrice(item.price);
  let priceDisplay = priceText;
  if (item.secondaryPrice) {
    priceDisplay = priceText + ' / ' + formatPrice(item.secondaryPrice);
  }
  doc.font('Cormorant-SemiBold')
    .fontSize(FONT_SIZE.price)
    .fillColor('#3d1020') // dark burgundy — CMYK approx C=30 M=100 Y=80 K=40
    .text(priceDisplay, x + colWidth - PRICE_COL_WIDTH, y, {
      width: PRICE_COL_WIDTH, align: 'right'
    });
  
  let currentY = y + Math.max(nameHeight, 16);
  
  // Description
  if (item.description) {
    doc.font('Cormorant-Regular')
      .fontSize(FONT_SIZE.description)
      .fillColor(COLORS.darkGray)
      .text(item.description.es, x, currentY, { width: colWidth - 2, lineGap: 1 });
    currentY += doc.heightOfString(item.description.es, { width: colWidth - 2, lineGap: 1 }) + 2;
  }
  
  // Allergen icons
  if (item.allergens && item.allergens.length > 0) {
    let badgeX = x;
    const iconSize = 8;
    item.allergens.forEach((allergen) => {
      const iconPath = path.join(process.cwd(), 'public', 'alergenos', `${allergen}.png`);
      if (badgeX + iconSize > x + colWidth - PRICE_COL_WIDTH) { badgeX = x; currentY += iconSize + 1; }
      if (fs.existsSync(iconPath)) doc.image(iconPath, badgeX, currentY, { width: iconSize });
      badgeX += iconSize + 1.5;
    });
    currentY += iconSize + 2;
  }
  
  doc.restore();
  return currentY;
}

function drawPageFooter(doc, pageNum, totalPages, showAllergens = false) {
  doc.save();
  
  if (showAllergens) {
    // Allergen legend in footer of last page
    const legendY = PAGE_HEIGHT - MARGIN - 60;
    const fullWidth = PAGE_WIDTH - (MARGIN * 2);
    
    // Header line
    doc.lineWidth(0.5);
    doc.moveTo(MARGIN, legendY);
    doc.lineTo(MARGIN + fullWidth, legendY);
    setStrokeColor(doc, COLORS.primary);
    doc.stroke();
    
    // Title
    doc.font('Cormorant-Bold')
      .fontSize(9)
      .fillColor(COLORS.primaryDark)
      .text('ALÉRGENOS:', MARGIN, legendY + 4, { width: fullWidth });
    
    // Legend items in a compact row
    const allergens = Object.entries(ALLERGEN_ICONS);
    let x = MARGIN + 60;
    const iconSize = 10;
    let y = legendY + 4;
    
    allergens.forEach(([key]) => {
      const label = key.replace(/_/g, ' ');
      const iconPath = path.join(process.cwd(), 'public', 'alergenos', `${key}.png`);
      if (x + iconSize + 40 > PAGE_WIDTH - MARGIN) { x = MARGIN; y += 16; }
      if (fs.existsSync(iconPath)) doc.image(iconPath, x, y, { width: iconSize });
      doc.font('Cormorant-Regular')
        .fontSize(7)
        .fillColor(COLORS.darkGray)
        .text(label, x + iconSize + 3, y + 1, { width: 35 });
      x += iconSize + 40;
    });
  }
  
  const footerY = PAGE_HEIGHT - MARGIN + 4;
  
  // Thin footer line
  doc.lineWidth(0.3);
  doc.moveTo(MARGIN, footerY - 3);
  doc.lineTo(PAGE_WIDTH - MARGIN, footerY - 3);
  setStrokeColor(doc, COLORS.lightGray);
  doc.stroke();
  
  // Footer text
  doc.font('Cormorant-Regular')
    .fontSize(6)
    .fillColor(COLORS.mediumGray)
    .text(`Página ${pageNum} de ${totalPages}  •  PicaitoLatino  •  Sabores Latinos Auténticos`, MARGIN, footerY, {
      width: PAGE_WIDTH - (MARGIN * 2), align: 'center'
    });
  
  doc.restore();
}

function drawAllergenLegend(doc, y) {
  doc.save();
  const fullWidth = PAGE_WIDTH - (MARGIN * 2);
  
  // Header line
  doc.lineWidth(0.5);
  doc.moveTo(MARGIN, y);
  doc.lineTo(MARGIN + fullWidth, y);
  setStrokeColor(doc, COLORS.primary);
  doc.stroke();
  y += 10;
  
  // Title
  doc.font('Cormorant-Bold')
    .fontSize(10)
    .fillColor(COLORS.primaryDark)
    .text('INFORMACIÓN SOBRE ALÉRGENOS', MARGIN, y, { width: fullWidth, align: 'center' });
  y += 16;
  
  // Legend items
  const allergens = Object.entries(ALLERGEN_ICONS);
  let x = MARGIN;
  const iconSize = 9;
  
  allergens.forEach(([key]) => {
    const label = key.replace(/_/g, ' ');
    const iconPath = path.join(process.cwd(), 'public', 'alergenos', `${key}.png`);
    if (x + iconSize + 45 > PAGE_WIDTH - MARGIN) { x = MARGIN; y += 15; }
    if (fs.existsSync(iconPath)) doc.image(iconPath, x, y, { width: iconSize });
    doc.font('Cormorant-Regular')
      .fontSize(7)
      .fillColor(COLORS.darkGray)
      .text(label, x + iconSize + 3, y + 1, { width: 40 });
    x += iconSize + 50;
  });
  
  doc.restore();
  return y + 18;
}

async function generatePDF() {
  const outputPath = path.join(process.cwd(), 'public', 'menu-print.pdf');
  if (!fs.existsSync(path.dirname(outputPath))) fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // Register custom fonts
  const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true, autoFirstPage: false });
  doc.pipe(fs.createWriteStream(outputPath));
  
  // Register Cormorant Garamond font variants
  doc.registerFont('Cormorant-Regular', FONTS.regular);
  doc.registerFont('Cormorant-Bold', FONTS.bold);
  doc.registerFont('Cormorant-SemiBold', FONTS.semibold);
  doc.registerFont('Cormorant-Light', FONTS.light);
  
  const groupedMenuData = menuData.map((category) => {
    if (category.id === 'bebidas' || category.id === 'cafes-infusiones' || category.id === 'tostadas-desayuno') {
      const subcategories = {};
      category.items.forEach((item) => {
        const subcat = item.subcategory || 'General';
        if (!subcategories[subcat]) subcategories[subcat] = [];
        subcategories[subcat].push(item);
      });
      return { ...category, subcategories };
    }
    return category;
  });
  
  const MAX_Y = PAGE_HEIGHT - MARGIN - 80; // Leave space for footer/allergens
  const pages = [];
  let page = { headers: [], leftItems: [], rightItems: [] };
  let leftY = MARGIN;
  let rightY = MARGIN;
  
  function startNewPage() {
    if (page.headers.length > 0 || page.leftItems.length > 0 || page.rightItems.length > 0) {
      pages.push({ ...page });
    }
    page = { headers: [], leftItems: [], rightItems: [] };
    leftY = MARGIN;
    rightY = MARGIN;
  }
  
  function getItemHeight(item) {
    const nameWidth = COLUMN_WIDTH - PRICE_COL_WIDTH - 4;
    doc.font('Cormorant-Bold').fontSize(FONT_SIZE.dishName);
    const textWidth = doc.widthOfString(item.name.es);
    const nameLines = Math.max(1, Math.ceil(textWidth / nameWidth));
    let h = nameLines * 17 + ITEM_GAP; // ~17pt per line + gap
    if (item.description) h += 18; // Description height (8.4pt + spacing)
    if (item.allergens && item.allergens.length > 0) h += 14; // Allergen icons
    return h;
  }
  
  // Pre-calculate section heights
  function getSectionHeight(category) {
    let height = 45; // Section header
    if (category.subcategories) {
      if (category.id === 'tostadas-desayuno') {
        // Parallel layout: left (Tostadas + Extras) vs right (Dulces)
        let leftH = 0;
        let rightH = 0;
        for (const [subcatName, items] of Object.entries(category.subcategories)) {
          if (subcatName === 'Dulces') {
            rightH += 16;
            for (const item of items) rightH += getItemHeight(item);
          } else {
            if (subcatName === 'Extras') leftH += 16;
            for (const item of items) leftH += getItemHeight(item);
          }
        }
        height += Math.max(leftH, rightH);
      } else {
        // Balanceo por altura: cada subcat puede usar ambas columnas
        let subcatHeights = [];
        for (const [subcatName, items] of Object.entries(category.subcategories)) {
          let h = 16; // subcategory header
          for (const item of items) h += getItemHeight(item);
          subcatHeights.push({ name: subcatName, height: h });
        }
        // Simular layout: asignar a la columna más vacía (igual que render real)
        let colLeft = 0, colRight = 0;
        for (const sc of subcatHeights) {
          const needed = sc.height;
          const available = Math.min(colLeft, colRight);
          if (available + needed > MAX_Y - MARGIN) {
            height += Math.max(colLeft, colRight);
            colLeft = 0; colRight = 0;
          }
          if (colLeft <= colRight) colLeft += needed;
          else colRight += needed;
        }
        height += Math.max(colLeft, colRight);
      }
    } else {
      for (const item of category.items) {
        height += getItemHeight(item);
      }
    }
    return height;
  }
  
  // Process each category - ensure it fits entirely on one page
  for (const category of groupedMenuData) {
    const headerH = 45;
    const sectionHeight = getSectionHeight(category);
    
    // If section doesn't fit on current page, start new page
    if (Math.max(leftY, rightY) + sectionHeight > MAX_Y) {
      startNewPage();
    }
    
    const headerY = Math.max(leftY, rightY);
    page.headers.push({ type: 'section', title: category.name.es, y: headerY });
    leftY = headerY + headerH;
    rightY = headerY + headerH;
    
    if (category.subcategories) {
      if (category.id === 'tostadas-desayuno') {
        // Layout paralelo: Tostadas+Extras izq, Dulces der — rightBaseline NO sigue leftY
        const rightBaseline = headerY + headerH;
        let rightY = rightBaseline;
        const isFirst = (name) => name === 'Tostadas';
        const isLeftSub = (name) => name === 'Extras';
        const isLast = (name) => name === 'Dulces';
        for (const [subcatName, items] of Object.entries(category.subcategories)) {
          if (isFirst(subcatName)) {
            for (const item of items) {
              const itemH = getItemHeight(item);
              if (leftY + itemH > MAX_Y) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); leftY = Math.max(leftY, rightY) + 45; rightY = leftY; }
              page.leftItems.push({ type: 'dish', item, y: leftY }); leftY += itemH;
            }
          } else if (isLeftSub(subcatName)) {
            const subcatY = leftY;
            if (subcatY > MAX_Y) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); }
            page.leftItems.push({ type: 'subcategory', title: subcatName, y: subcatY }); leftY += 16;
            for (const item of items) {
              const itemH = getItemHeight(item);
              if (leftY + itemH > MAX_Y) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); leftY = Math.max(leftY, rightY) + 45; rightY = leftY; }
              page.leftItems.push({ type: 'dish', item, y: leftY }); leftY += itemH;
            }
            // After left subcategory, reset rightY to rightBaseline (don't let it follow leftY)
            rightY = rightBaseline;
          } else if (isLast(subcatName)) {
            const subcatY = rightY;
            if (subcatY > MAX_Y) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); leftY = Math.max(leftY, rightY) + 45; rightY = leftY; }
            page.rightItems.push({ type: 'subcategory', title: subcatName, y: subcatY }); rightY += 16;
            for (const item of items) {
              const itemH = getItemHeight(item);
              if (rightY + itemH > MAX_Y) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); leftY = Math.max(leftY, rightY) + 45; rightY = leftY; }
              page.rightItems.push({ type: 'dish', item, y: rightY }); rightY += itemH;
            }
          }
        }
      } else {
        // Resto: flujo por altura
        for (const [subcatName, items] of Object.entries(category.subcategories)) {
          const subcatY = Math.min(leftY, rightY);
          if (subcatY > MAX_Y || subcatY < MARGIN) { startNewPage(); page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) }); leftY = Math.max(leftY, rightY) + 45; rightY = leftY; }
          page.headers.push({ type: 'subheader', title: subcatName, y: subcatY }); leftY = subcatY + 16; rightY = subcatY + 16;
          for (const item of items) {
            const itemH = getItemHeight(item);
            const targetY = leftY <= rightY ? leftY : rightY;
            if (targetY + itemH > MAX_Y) {
              startNewPage();
              const newSubcatY = Math.min(leftY, rightY);
              page.headers.push({ type: 'subheader', title: subcatName, y: newSubcatY }); leftY = newSubcatY + 16; rightY = newSubcatY + 16;
            }
            if (leftY <= rightY) { page.leftItems.push({ type: 'dish', item, y: leftY }); leftY += itemH; }
            else { page.rightItems.push({ type: 'dish', item, y: rightY }); rightY += itemH; }
          }
        }
      }
    } else {
      for (const item of category.items) {
        const itemH = getItemHeight(item);
        const targetY = leftY <= rightY ? leftY : rightY;
        if (targetY + itemH > MAX_Y) {
          startNewPage();
          page.headers.push({ type: 'section', title: category.name.es, y: Math.max(leftY, rightY) });
          leftY = Math.max(leftY, rightY) + 45;
          rightY = leftY;
        }
        if (leftY <= rightY) {
          page.leftItems.push({ type: 'dish', item, y: leftY });
          leftY += itemH;
        } else {
          page.rightItems.push({ type: 'dish', item, y: rightY });
          rightY += itemH;
        }
      }
    }
  }
  if (page.headers.length > 0 || page.leftItems.length > 0 || page.rightItems.length > 0) {
    pages.push(page);
  }
  
  const totalPages = pages.length;
  
  // Logo path
  const logoPathJpg = path.join(process.cwd(), 'public', 'logo.jpg');
  const logoPathPng = path.join(process.cwd(), 'public', 'logo.png');
  const logoPath = fs.existsSync(logoPathPng) ? logoPathPng : logoPathJpg;
  
  // Render menu pages
  for (let i = 0; i < pages.length; i++) {
    doc.addPage({ size: 'A4', margin: 0 });
    const p = pages[i];
    
    // Header with logo on every page
    const headerHeight = 50;
    const headerY = 0;
    
    // Background color (logo green)
    doc.save();
    doc.rect(0, headerY, PAGE_WIDTH, headerHeight);
    doc.fillColor('#0b773e');
    doc.fill();
    doc.restore();
    
    // Centered logo
    if (fs.existsSync(logoPath)) {
      const logoSize = 40;
      doc.image(logoPath, (PAGE_WIDTH - logoSize) / 2, headerY + (headerHeight - logoSize) / 2, {
        width: logoSize,
      });
    }
    
    // Adjust content start position
    const contentStartY = headerHeight + MARGIN;
    
    for (const h of p.headers) {
      if (h.type === 'section') drawSectionHeader(doc, h.title, h.y + headerHeight);
      else if (h.type === 'subheader') drawSubcategoryHeader(doc, h.title, MARGIN, h.y + headerHeight, PAGE_WIDTH - MARGIN * 2);
    }
    
    for (const entry of p.leftItems) {
      if (entry.type === 'subcategory') drawSubcategoryHeader(doc, entry.title, LEFT_COL_X, entry.y + headerHeight, COLUMN_WIDTH);
      else drawDishItem(doc, entry.item, LEFT_COL_X, entry.y + headerHeight, COLUMN_WIDTH, entry.item.special);
    }
    
    for (const entry of p.rightItems) {
      if (entry.type === 'subcategory') drawSubcategoryHeader(doc, entry.title, RIGHT_COL_X, entry.y + headerHeight, COLUMN_WIDTH);
      else drawDishItem(doc, entry.item, RIGHT_COL_X, entry.y + headerHeight, COLUMN_WIDTH, entry.item.special);
    }
    
    // Show allergens in footer of last page only
    const isLastPage = i === pages.length - 1;
    drawPageFooter(doc, i + 1, totalPages, isLastPage);
  }
  
  doc.end();
  console.log(`✅ PDF generado: ${outputPath}`);
  console.log(`📄 Total páginas: ${totalPages}`);
}

generatePDF().catch(console.error);
