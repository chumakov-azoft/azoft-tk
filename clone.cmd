

:: navigate into the build output directory
cd ..
rmdir /s /q  "tt3clone\"
if %errorlevel% neq 0 exit /b %errorlevel%

git clone git@github.com:chumakov-azoft/azoft-tk.git tt3clone
if %errorlevel% neq 0 exit /b %errorlevel%

##xcopy tt3\dist\*.* tt3clone\ /s /K /D /H /Y
robocopy tt3\dist\. tt3clone\. /IS /S /XD .git

cd tt3clone

git add -A
git commit -m 'add'

git status

git push git@github.com:chumakov-azoft/azoft-tk master

