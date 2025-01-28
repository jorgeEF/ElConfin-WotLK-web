import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Ruta para registrar usuarios portal
router.post('/register', register);

// Ruta para iniciar sesión portal
router.post('/login', login);

export default router;
