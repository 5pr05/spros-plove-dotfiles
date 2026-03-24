#!/bin/bash

# Убиваем старые часы
killall -q gluqlo

# 1. ОТКЛЮЧАЕМ телепортацию мыши (чтобы система не проснулась!)
swaymsg mouse_warping none

# 2. Тихо переводим фокус на ноутбук и запускаем первые часы
swaymsg focus output eDP-1
/usr/libexec/xscreensaver/gluqlo &

# Ждем полсекунды для прогрузки
sleep 0.5

# 3. Тихо переводим фокус на большой монитор и запускаем вторые часы
swaymsg focus output HDMI-A-2
/usr/libexec/xscreensaver/gluqlo &

# 4. Включаем стандартное поведение мыши обратно
swaymsg mouse_warping output