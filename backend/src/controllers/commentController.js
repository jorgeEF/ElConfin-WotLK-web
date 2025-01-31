import * as commentService from '../services/commentService.js';

// Crear un nuevo comentario
export const createComment = async (req, res) => {
    try {
        const { author_id, post_id, content } = req.body;

        // Validación básica de campos
        if (!author_id || !post_id || !content) {
            return res.status(400).json({ message: 'Faltan datos requeridos (author_id, post_id, content)' });
        }

        // Llamada al servicio para crear el comentario
        const commentId = await commentService.createComment(author_id, post_id, content);

        if (!commentId) {
            return res.status(500).json({ message: 'Error al crear el comentario' });
        }

        res.status(201).json({ message: 'Comentario creado exitosamente', commentId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
    }
};

// Obtener todos los comentarios de un post
export const getAllCommentsByPost = async (req, res) => {
    try {
        const { post_id } = req.params;  // Usar params para obtener el post_id desde la URL

        if (!post_id) {
            return res.status(400).json({ message: 'Falta el ID del post' });
        }

        const comments = await commentService.getAllCommentsByPost(post_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
};

// Obtener un comentario por ID
export const getComment = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el comentario', error: error.message });
    }
};

// Actualizar un comentario por ID
export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'El contenido del comentario es obligatorio' });
        }

        const updated = await commentService.updateCommentById(req.params.id, content);

        if (!updated) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comentario', error: error.message });
    }
};

// Eliminar un comentario por ID
export const deleteComment = async (req, res) => {
    try {
        const deleted = await commentService.deleteCommentById(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
};
