import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear y exportar la conexión a la base de datos wow auth
export const db_wow_auth = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_WOW_USER,
  password: process.env.DB_WOW_PASSWORD,
  database: process.env.DB_WOW_AUTH,
});

db_wow_auth.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos WoW:', err);
    return;
  }
  console.log('Conectado a la base de datos wow auth');
});

// Agregar otras bases de datos:

// Crear y exportar la conexión a la base de datos wow characters
export const db_wow_characters = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_WOW_USER,
  password: process.env.DB_WOW_PASSWORD,
  database: process.env.DB_WOW_CHARACTERS,
});

db_wow_characters.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos WoW:', err);
    return;
  }
  console.log('Conectado a la base de datos wow characters');
});
