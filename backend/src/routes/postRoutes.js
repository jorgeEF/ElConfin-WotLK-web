import express from 'express';
import { createPost, getAllPost, getAllPostCategory, getPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Crear un posteo
router.post('/', createPost);

// Obtener todos los posteos
router.get('/', getAllPost);

// Obtener todos los posteos por ID de categoria
router.get('/cat/:id', getAllPostCategory);

// Obtener un posteo por ID
router.get('/:id', getPost);

// Actualizar un posteo por ID
router.put('/:id', updatePost);

// Eliminar un posteo por ID
router.delete('/:id', deletePost);

export default router;

