import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = 'public/icons/icon.svg';
const outputDir = 'public/icons';

async function generateIcons() {
  try {
    // Убедимся, что папка существует
    await fs.mkdir(outputDir, { recursive: true });

    // Генерируем иконки всех размеров
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`✓ Создана иконка ${size}x${size}`);
    }

    console.log('✨ Все иконки успешно созданы!');
  } catch (error) {
    console.error('Ошибка при создании иконок:', error);
    process.exit(1);
  }
}

generateIcons(); 