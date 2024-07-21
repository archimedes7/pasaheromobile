#!/bin/bash

# Navigate to your project directory
cd /Users/shazam_khalee/Documents/2024/pasaHeroPH/testdrive/src

# Find all .js files and rename them to .tsx
find . -name "*.js" -not -path "./node_modules/*" -exec sh -c '
    mv "$1" "${1%.js}.tsx"
' sh {} \;

echo "Renaming complete!"