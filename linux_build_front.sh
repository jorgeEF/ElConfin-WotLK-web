#!/bin/bash

echo "Generando el build del frontend..."
cd frontend || { echo "Error: no se pudo acceder al directorio 'frontend'."; exit 1; }

npm run build
if [ $? -ne 0 ]; then
    echo "Error al generar el build del frontend."
    exit 1
fi

echo "Build generado exitosamente."