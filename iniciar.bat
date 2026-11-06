@echo off
rem Inicia o sistema de agendamento (Windows). Basta dar dois cliques neste arquivo.
chcp 65001 >nul
title Sistema de Agendamento
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   O Node.js nao esta instalado neste computador.
  echo   1. Abra https://nodejs.org e baixe a versao "LTS".
  echo   2. Instale e depois de dois cliques neste arquivo novamente.
  echo.
  pause
  exit /b 1
)

rem Confere a versao, cria o .env, instala o que faltar e compila o front-end.
node scripts\preparar.mjs
if errorlevel 1 (
  echo.
  echo   Nao foi possivel preparar o sistema. Leia a mensagem acima.
  pause
  exit /b 1
)

rem Inicia o sistema (fica rodando nesta janela).
node server\index.js
echo.
echo   O sistema foi encerrado.
echo   Para usar novamente, de dois cliques no iniciar.bat.
pause
