import sharp from 'sharp';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [512, 384, 192, 152, 144, 128, 96, 72];
const inputFile = join(__dirname, 'public', 'icons', 'icon.svg');

async function generateIcons() {
    for (const size of sizes) {
        const outputFile = join(__dirname, 'public', 'icons', `icon-${size}x${size}.png`);
        try {
            await sharp(inputFile)
                .resize(size, size)
                .png()
                .toFile(outputFile);
            console.log(`Generated ${size}x${size} icon`);
        } catch (error) {
            console.error(`Error generating ${size}x${size} icon:`, error);
        }
    }
}

generateIcons().catch(console.error); 