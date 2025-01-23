#!/bin/bash

# Ejecutar el backend
echo "Iniciando el backend..."
cd backend || { echo "Error: no se pudo acceder al directorio 'backend'."; exit 1; }
xterm -e "npm run start" &

# Volver al directorio raíz
cd ..

# Servir el frontend desde la carpeta build en el puerto 80
echo "Sirviendo el frontend en el puerto 80..."
cd frontend || { echo "Error: no se pudo acceder al directorio 'frontend'."; exit 1; }
xterm -e "npx serve -s dist -l 80" &

echo "Ambos servidores han sido iniciados."