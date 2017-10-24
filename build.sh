#!/bin/bash

echo -e "Rebuilding all frontends..."

cd dev

echo -e "Installing dependencies..."
npm install

# gulp init

echo -e "Compiling front-ends..."
gulp compile

cd ..

echo -e "Done"

