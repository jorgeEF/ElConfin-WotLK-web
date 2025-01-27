import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear y exportar la conexión a la base de datos
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos.', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});