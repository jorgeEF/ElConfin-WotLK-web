import { db } from '../config/db.js';
import Comment from '../models/Comment.js';

// Crear un nuevo comentario
export const createComment = async (author_id, post_id, content) => {
    try {
        // Crear una nueva instancia de Comment
        const newComment = new Comment({ author_id, post_id, content });

        // Validar los datos del comentario
        const validationError = Comment.validate(newComment);
        if (validationError) {
            throw new Error(validationError);  // Lanzar error si la validación falla
        }

        // Ejecutar la consulta SQL para insertar el comentario usando db.query con promesas
        const query = 'INSERT INTO confin_web.comments (author_id, post_id, content) VALUES (?, ?, ?)';
        const [result] = await db.promise().query(query, [author_id, post_id, content]);

        if (!result || !result.insertId) {
            throw new Error("Respuesta inesperada al insertar el comentario");
        }

        // Retornar el ID del nuevo comentario
        return result.insertId;
    } catch (error) {
        throw new Error(`Error en la base de datos: ${error.message}`);
    }
};

// Obtener todos los comentarios de un post
export const getAllCommentsByPost = async (post_id) => {
    try {
        const query = 'SELECT * FROM confin_web.comments WHERE post_id = ? ORDER BY created_at ASC';
        const [comments] = await db.promise().query(query, [post_id]);

        return comments;
    } catch (error) {
        throw new Error('Error al obtener los comentarios: ' + error.message);
    }
};

// Obtener un comentario por ID
export const getCommentById = async (id) => {
    try {
        const query = 'SELECT * FROM confin_web.comments WHERE id = ?';
        const [result] = await db.promise().query(query, [id]);

        return result.length ? result[0] : null;
    } catch (error) {
        throw new Error('Error al obtener el comentario por ID: ' + error.message);
    }
};

// Actualizar un comentario por ID
export const updateCommentById = async (id, content) => {
    try {
        const updatedComment = new Comment({ content });

        // Validar el comentario antes de actualizarlo
        const error = Comment.validate(updatedComment);
        if (error) throw new Error(error);

        const query = 'UPDATE confin_web.comments SET content = ? WHERE id = ?';
        const [result] = await db.promise().query(query, [content, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error al actualizar el comentario: ' + error.message);
    }
};

// Eliminar un comentario por ID
export const deleteCommentById = async (id) => {
    try {
        const query = 'DELETE FROM confin_web.comments WHERE id = ?';
        const [result] = await db.promise().query(query, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error al eliminar el comentario: ' + error.message);
    }
};
