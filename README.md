# Building the frontend

Global dependencies
```
sudo npm install -g gulp
sudo npm install -g nodemon
```

Load the submodules
```
git submodule init
git submodule update
```

Setting up the project
```
cd dev
npm i
npm install -g gulp
gulp init
```

Compile the website
```
gulp compile
```

Re-deploy:
1. cd into the project folder you want to deploy (it is a git submodule)
2. run `../deploy.sh`. It automatically publish the changes


