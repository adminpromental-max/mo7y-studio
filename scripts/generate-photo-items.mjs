import fs from "fs";
import path from "path";

const photosRoot = path.join(process.cwd(), "public/portfolio/photos");
const outFile = path.join(process.cwd(), "src/data/photoItems.ts");

const folderMeta = {
  Miami: { tag: "cafes", label: "ميامي" },
  Rise: { tag: "cafes", label: "Rise" },
  choco: { tag: "cafes", label: "Choco" },
  "موف كوفي": { tag: "cafes", label: "موف كوفي" },
  لاثاني: { tag: "restaurants", label: "لاثاني لاكستاني" },
  "خبزه وتصبيرة": { tag: "restaurants", label: "خبزة وتصبيرة" },
  المرابع: { tag: "restaurants", label: "المرابع" },
  كيك: { tag: "products", label: "كيك" },
  "بوفيه الرياض ان ": { tag: "events", label: "بوفيه الرياض" },
};

function encodePhotoPath(folder, file) {
  return `/portfolio/photos/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

const items = [];
let index = 0;

for (const folder of fs.readdirSync(photosRoot)) {
  const folderPath = path.join(photosRoot, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const meta = folderMeta[folder] ?? { tag: "cafes", label: folder.trim() };

  for (const file of fs.readdirSync(folderPath)) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    index += 1;
    const title = file.replace(/\.[^.]+$/, "");
    items.push({
      id: `photo-${index}`,
      title: `${meta.label} — ${title}`,
      image: encodePhotoPath(folder, file),
      tag: meta.tag,
    });
  }
}

const content = `/** Auto-generated — run: node scripts/generate-photo-items.mjs */
import type { PortfolioItem } from "./portfolio";

export const photoItems: PortfolioItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(outFile, content);
console.log(`Generated ${items.length} photo items → ${outFile}`);
