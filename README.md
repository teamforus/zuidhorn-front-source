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



All frontends are Single page applications and use javascript routing, to enable html5 mode (without /!#!/ symbols in url) you should add following code to apache2 configuration for the domain.
```
RewriteEngine On  
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]  
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d  
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```
