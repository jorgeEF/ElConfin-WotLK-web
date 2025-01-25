import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear y exportar la conexión a la base de datos WOTLK
export const db_wow = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_WOW_USER,
  password: process.env.DB_WOW_PASSWORD,
  database: process.env.DB_WOW_NAME,
});

db_wow.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos WoW:', err);
    return;
  }
  console.log('Conectado a la base de datos WoW');
});

// Agregar otras bases de datos:
// export const db_otherModule = mysql.createConnection({...});
