#!/bin/bash

sudo pacman -Syu

sudo pacman -S --needed \
    waybar \
    foot \
    swaybg \
    wdisplays \
    wofi

sudo pacman -S --needed \
    zsh \
    fzf \
    zoxide

sudo pacman -S --needed \
    pipewire-pulse \
    pavucontrol \
    brightnessctl \
    bluez \
    bluez-utils

yay -S --needed \
    ttf-jetbrains-mono-nerd \
    ttf-font-awesome \
    ttf-nerd-fonts-symbols \
    ttf-apple-emoji \
    everforest-gtk-theme-git \
    gruvbox-plus-icon-theme
