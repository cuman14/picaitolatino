import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const MM_TO_PT = 2.83465;
const PAGE_WIDTH = 210 * MM_TO_PT;
const PAGE_HEIGHT = 297 * MM_TO_PT;

const pagesDir = path.resolve('public/menu-pages');
const outPath = path.resolve('public/menu-print.pdf');

const files = [
  'page-1-cover.png',
  'page-2-menu.png',
  'page-3-allergens.png'
];

const doc = new PDFDocument({
  size: [PAGE_WIDTH, PAGE_HEIGHT],
  margin: 0,
  info: { Title: 'Picaito Latino - Menu' }
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

for (let i = 0; i < files.length; i++) {
  const imgPath = path.join(pagesDir, files[i]);
  if (!fs.existsSync(imgPath)) {
    console.error(`Missing: ${imgPath}`);
    continue;
  }
  if (i > 0) doc.addPage();
  doc.image(imgPath, 0, 0, { width: PAGE_WIDTH, height: PAGE_HEIGHT });
}

doc.end();
stream.on('finish', () => {
  console.log(`PDF generated: ${outPath}`);
});