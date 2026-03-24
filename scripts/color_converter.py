import sys
import re

# Список замен
color_replacements = {
    "2E3440": "262626",
    "3B4252": "403D3B",
    "434C5E": "403D3B",
    "4C566A": "5F5853",
    "5F5853": "E7E7E7",
    "E5E9F0": "F2F2F2",
    "ECEFF4": "F2F2F2",
    "8FBCBB": "B8A8A6",
    "88C0D0": "B5A285",
    "81A1C1": "AA9C86",
    "5E81AC": "736D51",
}

def replace_colors_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Производим замену всех цветов без учета регистра
        for old_color, new_color in color_replacements.items():
            content = re.sub(old_color, new_color, content, flags=re.IGNORECASE)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Цвета в файле {file_path} успешно заменены.")
    except Exception as e:
        print(f"Ошибка при обработке файла: {e}")

if __name__ == "__main__":
    file_path = input("Введите путь к файлу: ").strip()
    replace_colors_in_file(file_path)
