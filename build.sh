#!/bin/bash

if [ $# -eq 0 ]; then
    echo -e "Invalid use. Add a configuration (git branch name)"
    exit 1
fi
branch=$1

configfile="qdt-env.$branch.json"
if [ ! -f "dev/$configfile" ]; then
  echo -e "Building not possible. Config file (dev/$configfile) missing"
  echo -e "No idea what this is about? Create a sample configfile by: cd dev && npm i && gulp init"
  exit 1
fi


declare -a frontends=("zuidhorn-front-api-testing" "zuidhorn-front-kindpakket" "zuidhorn-front-winkelier")
echo -e "Prepare building by checking out repos for branch $branch"
for repo in "${frontends[@]}"
do
  cd "$repo"
  git stash
  git checkout "$branch"
  git pull
  git rebase
  cd ..
done


#START compile in dev folder with gulp
echo -e "Rebuilding all frontends..."
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
#END compile in dev folder with gulp

# confirm push
prompt_confirm() {
  while true; do
    read -r -n 1 -p "${1:-Continue?} [y/n]: " REPLY
    case $REPLY in
      [yY]) echo ; return 0 ;;
      [nN]) echo ; return 1 ;;
      *) printf " \033[31m %s \n\033[0m" "invalid input"
    esac 
  done  
}
prompt_confirm "Commit and push changes" || exit 0

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
	if [ $# -eq 2 ]
	  then msg="$2"
	fi
	git commit -m "$msg"

	# Push source and build repos.
	echo -e "Pushing..."
	git push origin $1
}
for repo in "${frontends[@]}"
do
  cd "$repo"
  build $branch
  cd ..
done

echo -e "Done"

