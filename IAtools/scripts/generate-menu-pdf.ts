import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { menuData } from "../../src/data/menu.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const publicDir = path.join(projectRoot, "public");
const outputPath = path.join(publicDir, "menu-print.pdf");

const logoBase64 = fs.readFileSync(
  path.join(publicDir, "logo.png"),
  "base64",
);

const allergenIcons: Record<string, string> = {};
const allergenDir = path.join(publicDir, "alergenos");
const allergens: Array<{ key: string; file: string }> = [
  { key: "gluten", file: "gluten.png" },
  { key: "lacteos", file: "lacteos.png" },
  { key: "huevo", file: "huevo.png" },
  { key: "soja", file: "soja.png" },
  { key: "apio", file: "apio.png" },
  { key: "sesamo", file: "sesamo.png" },
  { key: "mostaza", file: "mostaza.png" },
  { key: "sulfitos", file: "sulfitos.png" },
  { key: "frutos_con_cascara", file: "frutos_con_cascara.png" },
  { key: "cacahuetes", file: "cacahuetes.png" },
  { key: "pescado", file: "pescado.png" },
  { key: "crustaceos", file: "crustaceos.png" },
  { key: "moluscos", file: "moluscos.png" },
  { key: "altramuces", file: "altramuces.png" },
];
for (const a of allergens) {
  const p = path.join(allergenDir, a.file);
  if (fs.existsSync(p)) {
    allergenIcons[a.key] = `data:image/png;base64,${fs.readFileSync(p, "base64")}`;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrice(p: string | number): string {
  const n = typeof p === "string" ? parseFloat(p) : p;
  return n.toFixed(2).replace(".", ",");
}

function renderAllergenIcons(allergens?: string[]): string {
  if (!allergens || allergens.length === 0) return "";
  return allergens
    .map((a) => {
      const src = allergenIcons[a];
      if (!src) return "";
      return `<img class="allergen" src="${src}" alt="${escapeHtml(a)}" />`;
    })
    .join("");
}

function renderCategory(cat: (typeof menuData)[number]): string {
  const groups = new Map<string, typeof cat.items>();
  cat.items.forEach((item) => {
    const sub = item.subcategory ?? "";
    if (!groups.has(sub)) groups.set(sub, []);
    groups.get(sub)!.push(item);
  });

  const groupHtml = Array.from(groups.entries())
    .map(([subcategory, items]) => {
      const subHeader = subcategory
        ? `<div class="subcategory">${escapeHtml(subcategory)}</div>`
        : "";

      const itemsHtml = items
        .map((item) => {
          const priceText =
            item.secondaryPrice != null
              ? `${formatPrice(item.price)}€ / ${formatPrice(item.secondaryPrice)}€`
              : `${formatPrice(item.price)}€`;

          const desc = item.description?.es
            ? `<div class="item-desc">${escapeHtml(item.description.es)}</div>`
            : "";

          const icons = renderAllergenIcons(item.allergens);

          return `
            <div class="item">
              <div class="item-head">
                <div class="item-name">${escapeHtml(item.name.es)}</div>
                <div class="item-price">${priceText}</div>
              </div>
              ${desc}
              <div class="item-allergens">${icons}</div>
            </div>`;
        })
        .join("");

      return subHeader + itemsHtml;
    })
    .join("");

  return `
    <div class="page">
      <div class="band band-top">
        <img class="logo" src="data:image/png;base64,${logoBase64}" alt="Picaito Latino" />
      </div>
      <div class="content">
        <h1 class="category-title">${escapeHtml(cat.name.es)}</h1>
        <div class="grid">
          ${groupHtml}
        </div>
      </div>
      <div class="band band-bottom">
        <div class="footer-text">PicaitoLatino · Sabores Latino Auténticos</div>
      </div>
    </div>`;
}

const pagesHtml = menuData.map(renderCategory).join("");

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Carta Picaito Latino</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    font-family: "Cormorant Garamond", "Times New Roman", serif;
    color: #1a1a1a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .page:last-child { page-break-after: auto; }

  .band {
    background: #1f5d36;
    height: 30mm;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .band-top { border-bottom: 1px solid #14452a; }
  .band-bottom { border-top: 1px solid #14452a; }

  .logo {
    height: 22mm;
    width: auto;
  }
  .footer-text {
    color: #ffffff;
    font-size: 9pt;
    letter-spacing: 0.5px;
    text-align: center;
    font-style: italic;
  }

  .content {
    flex: 1;
    padding: 8mm 12mm 6mm 12mm;
    display: flex;
    flex-direction: column;
  }

  .category-title {
    color: #1f5d36;
    font-size: 22pt;
    font-weight: 700;
    text-align: center;
    margin: 0 0 2mm 0;
    padding: 2mm 0;
    border-top: 0.5pt solid #1f5d36;
    border-bottom: 0.5pt solid #1f5d36;
    letter-spacing: 1px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10mm;
    row-gap: 0;
    margin-top: 4mm;
  }

  .subcategory {
    color: #b8860b;
    font-size: 10pt;
    font-style: italic;
    margin: 4mm 0 1.5mm 0;
    grid-column: 1 / -1;
    break-after: avoid;
  }
  .subcategory:first-child { margin-top: 0; }

  .item {
    margin: 1.5mm 0 3mm 0;
    break-inside: avoid;
  }
  .item-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 4mm;
  }
  .item-name {
    font-size: 12pt;
    font-weight: 600;
    line-height: 1.2;
    flex: 1;
  }
  .item-price {
    font-size: 11pt;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
  }
  .item-desc {
    font-size: 9pt;
    font-style: italic;
    color: #666;
    margin-top: 0.5mm;
  }
  .item-allergens {
    display: flex;
    gap: 1.5mm;
    margin-top: 1mm;
    min-height: 5mm;
  }
  .allergen {
    width: 5mm;
    height: 5mm;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
</head>
<body>
${pagesHtml}
</body>
</html>`;

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });

await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  preferCSSPageSize: true,
});

// Also save HTML preview for debugging
const previewHtmlPath = path.join(projectRoot, "IAtools", "tmp", "preview.html");
const previewDir = path.dirname(previewHtmlPath);
if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });
fs.writeFileSync(previewHtmlPath, html);
console.log(`HTML preview: ${previewHtmlPath}`);

await browser.close();

const totalProducts = menuData.reduce((acc, c) => acc + c.items.length, 0);
console.log(`PDF generado: ${outputPath}`);
console.log(`Total: ${menuData.length} páginas, ${totalProducts} productos`);
