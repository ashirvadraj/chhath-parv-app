@echo off
echo ========================================================
echo   Building Chhath Parv Android APK (छठ पर्व)
echo ========================================================
echo.

set JAVA_HOME=C:\Users\ASHIR\.jdks\jbr-17.0.14
set ANDROID_HOME=C:\Users\ASHIR\AppData\Local\Android\Sdk
set ANDROID_SDK_ROOT=C:\Users\ASHIR\AppData\Local\Android\Sdk

echo [1/3] Building Web bundle (TypeScript + Vite)...
cd /d C:\Users\ASHIR\.gemini\antigravity\scratch\chhath-parv-app
call npm run build

echo.
echo [2/3] Syncing assets into Android project...
xcopy /Y /E /I "dist\*" "android\app\src\main\assets\public\" >nul

echo.
echo [3/3] Compiling Android APK with Gradle...
cd android
call gradlew.bat assembleDebug --no-daemon

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ========================================================
    echo SUCCESS! Chhath Parv APK created:
    echo app\build\outputs\apk\debug\app-debug.apk
    echo ========================================================
    copy /Y "app\build\outputs\apk\debug\app-debug.apk" "..\ChhathParv.apk"
    echo Copied to root: ChhathParv.apk
) else (
    echo.
    echo [ERROR] Build failed. Please inspect the log above.
)
pause
