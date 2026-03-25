import sys
import re
import os
import urllib.request
from pathlib import Path

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

NORD_URL = "https://raw.githubusercontent.com/nordtheme/vim/main/colors/nord.vim"

HOME = str(Path.home())
NVIM_COLORS_DIR = os.path.join(HOME, ".config", "nvim", "colors")
TARGET_FILE = os.path.join(NVIM_COLORS_DIR, "nord.vim")

def download_and_patch_theme():
    try:
        os.makedirs(NVIM_COLORS_DIR, exist_ok=True)
        
        print("Downloading the original Nord palette...")
        req = urllib.request.Request(NORD_URL)
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')

        print("Converting colors for G3N SWAY ENGINE...")
        for old_color, new_color in color_replacements.items():
            content = re.sub(old_color, new_color, content, flags=re.IGNORECASE)

        with open(TARGET_FILE, 'w', encoding='utf-8') as file:
            file.write(content)

        print(f"Theme successfully created and saved to: {TARGET_FILE}")
        print("Do not forget to add 'colorscheme nord' to your init.vim or init.lua")

    except Exception as e:
        print(f"Error processing theme: {e}")
        sys.exit(1)

if __name__ == "__main__":
    download_and_patch_theme()
