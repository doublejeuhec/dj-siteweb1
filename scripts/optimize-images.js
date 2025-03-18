const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const QUALITY = 80;
const MAX_WIDTH = 800;

// Directories to process
const IMAGE_DIRS = [
  path.join(process.cwd(), "public/images/CF/Promo2024"),
  path.join(process.cwd(), "public/images/CF/Promo2025"),
];

// Output directories
const OUTPUT_DIRS = [
  path.join(process.cwd(), "public/images/CF/Promo2024/optimized"),
  path.join(process.cwd(), "public/images/CF/Promo2025/optimized"),
];

// Create output directories if they don't exist
OUTPUT_DIRS.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Process each directory
IMAGE_DIRS.forEach((imageDir, index) => {
  const outputDir = OUTPUT_DIRS[index];

  // Get all image files
  const files = fs
    .readdirSync(imageDir)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Processing ${files.length} images in ${imageDir}...`);

  // Process each image
  files.forEach((file) => {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(outputPath)
      .then(() => {
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const savings = (
          (1 - outputStats.size / inputStats.size) *
          100
        ).toFixed(1);

        console.log(
          `✓ ${file}: ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% saved)`
        );
      })
      .catch((err) => console.error(`Error processing ${file}:`, err));
  });
});
