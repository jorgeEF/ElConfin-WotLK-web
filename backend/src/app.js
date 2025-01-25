import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wowAuthRoutes from './routes/wow/authRoutes.js';  // Rutas de autenticación

// Configurar dotenv para leer variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const FRONT_URL = process.env.FRONT_URL;

// Middlewares
app.use(cors({
  origin: FRONT_URL, // Permitir solo este origen
  methods: ['GET', 'POST'], // Métodos permitidos
}));
app.use(express.json());

// Rutas WotLK
app.use('/api/wow/auth', wowAuthRoutes);

// Configuración del puerto
const port = process.env.PORT;

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});
