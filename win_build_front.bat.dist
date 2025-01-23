@echo off
echo Generando el build del frontend...
cd frontend
npm run build

if %errorlevel% neq 0 (
    echo Error al generar el build del frontend.
    pause
    exit /b
)
echo Build generado exitosamente.