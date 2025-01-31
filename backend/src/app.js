import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import wowAuthRoutes from './routes/wow/authRoutes.js';
import wowStatusRoutes from './routes/wow/statusRoutes.js';

// Configurar dotenv para leer variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const FRONT_URL = process.env.FRONT_URL;

// Middlewares
app.use(cors({
  origin: FRONT_URL, // Permitir solo este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));
app.use(express.json());

// Rutas web
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Rutas WoW
app.use('/api/wow/auth', wowAuthRoutes);
app.use('/api/wow/status', wowStatusRoutes);

// Configuración del puerto
const port = process.env.PORT;

// Condicional para diferenciar el entorno de producción y desarrollo
if (process.env.ENTORNO === 'PRD') {
  // HTTPS credentials (ruta a tus certificados en producción)
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/confin.ddns.net/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/confin.ddns.net/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/confin.ddns.net/chain.pem', 'utf8');

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  // Iniciar servidor HTTPS en producción
  https.createServer(credentials, app).listen(port, () => {
    console.log(`Servidor escuchando en https://0.0.0.0:${port}`);
  });
} else if (process.env.ENTORNO === 'DEV') {
  // En desarrollo, solo HTTP
  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
  });
}