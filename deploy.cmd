
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:chumakov-azoft/azoft-tk master

