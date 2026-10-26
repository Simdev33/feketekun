// Képek előkészítése a source-assets/ mappából a public/img/ alá.
// Futtatás: node scripts/prep-images.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "source-assets/fb/";
const OUT = "public/img/";
mkdirSync(OUT, { recursive: true });

const fb = (n) => {
  const files = {
    "00": "00_122132430747470787.jpg",
    "03": "03_122130032853470787.jpg",
    "04": "04_122130031905470787.jpg",
    "05": "05_122130031869470787.jpg",
    "07": "07_122127725781470787.jpg",
    "08": "08_122127725709470787.jpg",
    "09": "09_122127725685470787.jpg",
    "10": "10_122127725541470787.jpg",
    "11": "11_122127725517470787.jpg",
    "12": "12_122108091837470787.jpg",
    "13": "13_122107932789470787.jpg",
    "14": "14_122107932759470787.jpg",
    "15": "15_122107932681470787.jpg",
    "16": "16_122107932657470787.jpg",
    "17": "17_122107932483470787.jpg",
    "18": "18_122107932441470787.jpg",
    "19": "19_122107932375470787.jpg",
    "20": "20_122107932363470787.jpg",
    "21": "21_122101739409470787.jpg",
    "22": "22_122101713459470787.jpg",
  };
  return SRC + files[n];
};

// Plakátokból kivágott ételfotók: [név, forrás, left, top, width, height]
const crops = [
  ["hero-burger", "07", 30, 470, 970, 680],
  ["bbq-csibe-burger", "07", 60, 480, 930, 650],
  ["csibe-burger", "11", 50, 530, 930, 590],
  ["csirkemellcsikok", "08", 40, 560, 960, 560],
  ["nuggets", "09", 20, 540, 980, 590],
  ["kijevi", "10", 20, 540, 980, 590],
  ["kentucky-box", "03", 30, 545, 1060, 555],
  ["gyrostal-duo", "04", 0, 600, 1122, 340],
  ["gyrostal", "04", 0, 590, 600, 380],
  ["burger-duo", "05", 20, 625, 1080, 345],
  ["harcos", "00", 0, 140, 440, 560],
  ["solymasz", "21", 458, 40, 406, 1205],
];

for (const [name, n, left, top, width, height] of crops) {
  let img = sharp(fb(n)).extract({ left, top, width, height });
  // a kis felbontású kivágásokat felnagyítjuk, hogy retinán se essen szét
  if (width < 600) img = img.resize({ width: width * 2, kernel: "lanczos3" }).sharpen({ sigma: 0.8 });
  await img.webp({ quality: 86 }).toFile(`${OUT}${name}.webp`);
  console.log("crop", name);
}

// Valódi fotók a konyháról
const photos = {
  bejarat: "12",
  "csaladi-asztal": "13",
  "pizza-szalamis": "14",
  "hekk-burger-gyros": "15",
  langos: "16",
  "gyros-langos": "17",
  "pizza-zoldseges": "18",
  hekk: "19",
  "burger-menu": "20",
};
for (const [name, n] of Object.entries(photos)) {
  await sharp(fb(n)).resize({ width: 1600 }).webp({ quality: 82 }).toFile(`${OUT}foto-${name}.webp`);
  console.log("photo", name);
}

// Teljes plakátok (akciók + étlap)
for (const [name, file] of [
  ["plakat-kentucky-box", fb("03")],
  ["plakat-gyrostal", fb("04")],
  ["plakat-burgerakcio", fb("05")],
  ["etlap", "source-assets/etlap.webp"],
]) {
  await sharp(file).resize({ width: 1024, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`${OUT}${name}.webp`);
  console.log("poster", name);
}

// Logó: a fekete korong kivágása kör alakú alfamaszkkal
{
  const { data, info } = await sharp(fb("22")).greyscale().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[y * info.width + x] < 70) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
  const size = Math.max(maxX - minX, maxY - minY) + 1;
  const r = size / 2 - 1.5;
  const S = 1024;
  const mask = Buffer.from(
    `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${(r * S) / size}" fill="#fff"/></svg>`,
  );
  const disk = await sharp(fb("22"))
    .extract({ left: minX, top: minY, width: size, height: size })
    .resize(S, S, { kernel: "lanczos3" })
    .ensureAlpha()
    .toBuffer();
  const out = await sharp(disk).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  await sharp(out).resize(512).png().toFile(`${OUT}logo.png`);
  await sharp(out).resize(512).png().toFile("app/icon.png");
  await sharp(out).resize(180).png().toFile("app/apple-icon.png");
  console.log("logo", { minX, minY, size });
}

// OG-kép
await sharp(fb("07"))
  .extract({ left: 0, top: 380, width: 1024, height: 538 })
  .resize(1200, 630)
  .jpeg({ quality: 84 })
  .toFile("app/opengraph-image.jpg");
console.log("og");
