#!/bin/bash

function build() {
	BRANCH=$(git rev-parse --abbrev-ref HEAD)
	if [ "$BRANCH" != "testing" ] && [ "$BRANCH" != "master" ]; then
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
	echo -e "Pushing..."
	git push origin $2
}

function run_for_folder() {
	echo "Building $1 for $2..."
	cd $1
	git checkout $2
	build $2
	cd ..
}


if [ $# -eq 0 ]; then
    echo -e "Invalid use. Use a branch name (i.e. master or testing)"
    exit 1
fi

echo "Pushing all front-ends for $1"

run_for_folder "zuidhorn-front-api-testing" $1
run_for_folder "zuidhorn-front-kindpakket" $1
run_for_folder "zuidhorn-front-winkelier" $1

echo "Done"
