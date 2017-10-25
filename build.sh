#!/bin/bash

if [ $# -eq 0 ]; then
    echo -e "Invalid use. Add a configuration (git branch name)"
    exit 1
fi

configfile="qdt-env.$1.json"
if [ ! -f "dev/$configfile" ]; then
  echo -e "Building not possible. Config file (dev/$configfile) missing"
  echo -e "No idea what this is about? Create a sample configfile by: cd dev && npm i && gulp init"
  exit 1
fi

echo -e "Rebuilding all frontends for $1..."
cd dev

echo -e "Patching qdt-env.json file..."
baseconfigfile="qdt-env.json"
cp "$configfile" "$baseconfigfile"

echo -e "Installing dependencies..."
npm install

# gulp init

echo -e "Compiling front-ends..."
gulp compile

cd ..

echo -e "Done"

