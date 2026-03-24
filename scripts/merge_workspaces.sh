#!/bin/bash

for i in {6..10}; do
    TARGET=$((i-5))
    swaymsg "[workspace=$i] move container to workspace $TARGET"
done

swaymsg "workspace 1"