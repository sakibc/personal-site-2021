#!/bin/sh

rm -rf sakibc.github.io
git clone https://github.com/sakibc/sakibc.github.io.git

cd sakibc.github.io

rm -r 404 page-data static
rm *.js *.js.map *.html *.LICENSE.txt *.json *.css

cp -r ../public/* .

git config user.email "sakib_c@outlook.com"
git config user.name "Sakib Chowdhury"

git add .
git commit -m "Deployed by Jenkins"

git push