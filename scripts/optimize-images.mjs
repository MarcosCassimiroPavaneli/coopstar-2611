import { readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const oldAssets = path.join(root, "old");
const outDir = path.join(root, "public", "images");

const jobs = [
  { name: "hero-1", src: "banner/img1.jpg", w: 1920 },
  { name: "hero-2", src: "banner/img2.jpg", w: 1920 },
  { name: "hero-3", src: "banner/img3.jpg", w: 1920 },
  { name: "hero-4", src: "banner/img4.jpg", w: 1920 },
  { name: "service-motorfrete", src: "imagens/img1.jpg", w: 800 },
  { name: "service-delivery", src: "imagens/img2.jpg", w: 800 },
  { name: "service-foradacapital", src: "imagens/img3.jpg", w: 800 },
];

async function main() {
  await mkdir(outDir, { recursive: true });

  // Copy logo + png fallback
  await copyFile(
    path.join(oldAssets, "imagens", "logotipo.png"),
    path.join(outDir, "logo.png"),
  );
  await sharp(path.join(oldAssets, "imagens", "logotipo.png"))
    .resize({ width: 600 })
    .toFormat("webp", { quality: 85 })
    .toFile(path.join(outDir, "logo.webp"));

  for (const job of jobs) {
    const src = path.join(oldAssets, job.src);
    const pipeline = sharp(src).rotate().resize({ width: job.w, withoutEnlargement: true });

    await Promise.all([
      pipeline.clone().toFormat("webp", { quality: 80 }).toFile(path.join(outDir, `${job.name}.webp`)),
      pipeline.clone().toFormat("avif", { quality: 65 }).toFile(path.join(outDir, `${job.name}.avif`)),
    ]);
    console.log(`ok: ${job.name}`);
  }

  // Open Graph image 1200x630
  await sharp(path.join(oldAssets, "banner", "img1.jpg"))
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .toFormat("jpg", { quality: 82 })
    .toFile(path.join(outDir, "og-image.jpg"));
  console.log("ok: og-image.jpg");

  // remove leftover service-4..6 references safety: list files
  const files = await readdir(outDir);
  console.log("\npublic/images:", files.join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
