import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';  // Las rutas de autenticación

// Configurar dotenv para leer variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api/auth', authRoutes);

// Configuración del puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
