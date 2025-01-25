import express from 'express';
import { register, login } from '../../controllers/wow/authController.js';

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

export default router;
