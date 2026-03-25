#!/bin/bash

echo "Starting SPROS sway config installation..."

sudo pacman -Syu --needed base-devel git

if ! command -v yay &> /dev/null; then
    echo "Installing yay..."
    git clone https://aur.archlinux.org/yay.git
    cd yay
    makepkg -si --noconfirm
    cd ..
    rm -rf yay
fi

echo "Installing main system packages..."
sudo pacman -S --needed \
    python \
    wayland wayland-protocols xorg-server-xwayland xdg-desktop-portal-wlr qt5-wayland \
    pipewire pipewire-pulse pavucontrol \
    bluez bluez-utils nm-connection-editor \
    swaybg waybar wofi swaylock autotiling \
    wl-clipboard cliphist grim slurp \
    foot zsh fzf zoxide bat fastfetch htop \
    neovim nodejs npm lua luarocks stow \
    nemo tumbler webp-pixbuf-loader file-roller lsix \
    firefox mpv keepassxc \
    brightnessctl ddcutil

echo "Installing themes, fonts, and SwayFX from AUR..."
yay -S --needed \
    swayfx \
    gruvbox-dark-gtk \
    gruvbox-material-icon-theme \
    ttf-jetbrains-mono-nerd \
    ttf-font-awesome \
    ttf-nerd-fonts-symbols \
    ttf-apple-emoji

echo "Enabling system services..."
sudo systemctl enable bluetooth

if [ "$SHELL" != "/usr/bin/zsh" ]; then
    echo "Changing default shell to Zsh..."
    chsh -s $(which zsh)
fi

echo "Applying configurations using stow..."
stow . 

echo "Running colorconverter.py to configure Neovim palette..."
if [ -f "colorconverter.py" ]; then
    python color_converter.py
    echo "Neovim palette successfully converted for G3N SWAY ENGINE!"
else
    echo "File colorconverter.py not found. Make sure you are in the dotfiles directory."
fi

echo "Installation fully completed! Please reboot your computer."
