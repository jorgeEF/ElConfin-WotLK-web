import express from 'express';
import { getOnlineChars, getOnlineUsersChars, getOnlineCharsCount } from '../../controllers/wow/statusController.js';

const router = express.Router();

// Ruta para obtener lista de personajes online (incluye bots)
router.get('/online_chars', getOnlineChars);

// Ruta para obtener lista de personajes de usuarios online (excluye bots)
router.get('/online_users_chars', getOnlineUsersChars);

// Ruta para contar personajes online (incluye bots)
router.get('/online_count', getOnlineCharsCount)

export default router;
