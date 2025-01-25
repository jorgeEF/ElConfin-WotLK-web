import express from 'express';
import { onlineChars, onlineCharsCount } from '../../controllers/wow/statusController.js';

const router = express.Router();

// Ruta para consultar usuarios online
router.get('/online_chars', onlineChars);

// Ruta para contar personajes online
router.get('/online_count', onlineCharsCount)

export default router;
