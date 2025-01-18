@echo off

:: Ejecutar el backend
echo Iniciando el backend...
cd backend
start cmd /k "npm run start"

:: Volver al directorio raíz
cd..

:: Servir el frontend desde la carpeta build en el puerto 80
echo Sirviendo el frontend en el puerto 80...
cd frontend
start cmd /k "npx serve -s dist -l 80"

echo Ambos servidores han sido iniciados.


