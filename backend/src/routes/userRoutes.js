import express from 'express';
import { register, login } from '../controllers/userController.js';

const router = express.Router();

// Ruta para registrar o iniciar sesión
router.post('/', async (req, res) => {
    const { action } = req.body;
    
    if (action === 'register') {
        return register(req, res);
    } else if (action === 'login') {
        return login(req, res);
    } else {
        return res.status(400).json({ message: "Acción no válida" });
    }
});

export default router;
