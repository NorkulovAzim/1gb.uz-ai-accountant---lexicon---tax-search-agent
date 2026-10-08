@echo off
:: ==============================================================
:: 1GB.uz Главбух Узбекистан - Windows Desktop Launcher
:: Запуск приложения в отдельном окне без рамок браузера
:: ==============================================================
title 1GB.uz Главбух Узбекистан

set "TARGET_URL=https://1gb.uz"
where msedge >nul 2>nul
if %errorlevel% equ 0 (
    start "" msedge --app="%TARGET_URL%"
    exit /b
)

where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start "" chrome --app="%TARGET_URL%"
    exit /b
)

start "" "%TARGET_URL%"
exit /b
