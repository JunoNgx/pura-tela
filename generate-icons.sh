#!/bin/bash

SOURCE="static/icon.png"

# convert "$SOURCE" -resize 144x144  static/favicon.png
convert "$SOURCE" -resize 180x180  static/icon-180x180.png
convert "$SOURCE" -resize 256x256  static/icon-256x256.png
convert "$SOURCE" -resize 512x512  static/icon-512x512.png
cp "$SOURCE" static/icon-1024x1024.png

echo "Icons generated successfully."
