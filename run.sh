#!/bin/bash

echo "Starting SwipeMate application..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the development server
echo "Starting development server..."
npm run dev 