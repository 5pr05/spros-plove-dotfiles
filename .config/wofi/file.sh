#!/bin/bash
# fileexplorer.sh

# Start at the present directory
FILEPATH=$(pwd)

# While FILEPATH is a directory loop
while [ -d "$FILEPATH" ]; do
    # List ".." and files in the FILEPATH directory in wofi
    # Set RESPONSE to what the user entered
    RESPONSE=$(echo -e "..\n$(ls \"$FILEPATH\")" | wofi -d -x 170 -y 10 --height 350 --width 500 --hide-scroll)

    # If the response was ".." then set FILEPATH to parent directory
    # Else if RESPONSE is empty then exit with code 1
    # Else set FILEPATH to the selected full path
    if [ "$RESPONSE" == ".." ]; then
        FILEPATH=$(dirname "$FILEPATH")
    elif [ -z "$RESPONSE" ]; then
        exit 1
    else
        FILEPATH="$FILEPATH/$RESPONSE"
    fi
done

# Это что бы ну какбы файлы тама както в туда как надо
if [ -f "$FILEPATH" ]; then
    xdg-open "$FILEPATH"
else
    exit 1
fi
