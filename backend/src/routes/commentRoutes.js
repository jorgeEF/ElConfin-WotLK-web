import express from 'express';
import { createComment, getAllComment, getComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Ruta para crear un posteo
router.post('/', createComment);

// Ruta para obtener todos los posteos
router.get('/', getAllComment);

// Ruta para obtener un posteo
router.get('/:id', getComment);

// Ruta para actualizar un posteo
router.put('/:id', updateComment);

// Ruta para actualizar un posteo
router.delete('/:id', deleteComment);

export default router;