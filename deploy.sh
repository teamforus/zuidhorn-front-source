#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "testing" ]]; then
  echo 'This is either not the correct project folder to deploy the new site or the current 
branch is not testing. Abort.';
  exit 1;
fi

# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin testing

echo "Done"

