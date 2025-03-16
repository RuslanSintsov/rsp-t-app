const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [512, 384, 192, 152, 144, 128, 96, 72];
const inputFile = path.join(__dirname, 'public', 'icons', 'icon.svg');

async function generateIcons() {
  for (const size of sizes) {
    const outputFile = path.join(__dirname, 'public', 'icons', `icon-${size}x${size}.png`);
    await sharp(inputFile)
      .resize(size, size)
      .png()
      .toFile(outputFile);
    console.log(`Generated ${size}x${size} icon`);
  }
}

generateIcons().catch(console.error); 