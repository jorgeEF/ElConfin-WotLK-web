import express from 'express';
import { register, login, online, onlineAll } from '../../controllers/wow/authController.js';

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// usuarios online
router.get('/online', online)

// usuarios + bots online
router.get('/online_all', onlineAll)

export default router;
