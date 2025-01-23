#!/bin/bash

# Ejecutar el backend
echo "Iniciando el backend..."
cd backend || { echo "Error: no se pudo acceder al directorio 'backend'."; exit 1; }
gnome-terminal -- bash -c "npm run start; exec bash" &

# Volver al directorio raíz
cd ..

# Servir el frontend desde la carpeta build en el puerto 80
echo "Sirviendo el frontend en el puerto 80..."
cd frontend || { echo "Error: no se pudo acceder al directorio 'frontend'."; exit 1; }
gnome-terminal -- bash -c "npx serve -s dist -l 80; exec bash" &

echo "Ambos servidores han sido iniciados."