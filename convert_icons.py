import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

# Размеры иконок
sizes = [512, 384, 192, 152, 144, 128, 96, 72]

# Путь к SVG файлу
svg_path = os.path.join('public', 'icons', 'icon.svg')

# Загружаем SVG
drawing = svg2rlg(svg_path)

# Конвертация в разные размеры
for size in sizes:
    output_path = os.path.join('public', 'icons', f'icon-{size}x{size}.png')
    renderPM.drawToFile(drawing, output_path, fmt='PNG', width=size, height=size)
    print(f'Generated {size}x{size} icon') 