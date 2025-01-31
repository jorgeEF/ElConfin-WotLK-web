import express from 'express';
import { createComment, getAllCommentsByPost, getComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Ruta para crear un comentario
router.post('/', createComment);

// Ruta para obtener todos los comentarios de un post
router.get('/post/:post_id', getAllCommentsByPost);

// Ruta para obtener un comentario por ID
router.get('/:id', getComment);

// Ruta para actualizar un comentario por ID
router.put('/:id', updateComment);

// Ruta para eliminar un comentario por ID
router.delete('/:id', deleteComment);

export default router;