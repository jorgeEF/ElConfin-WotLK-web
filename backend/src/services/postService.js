import { db } from '../config/db.js';
import Post from '../models/Post.js';

// Crear un nuevo post
export const createPost = async (title, content, author_id, category_id, visible, main_page) => {
    try {
        // Crear una nueva instancia de Post
        const newPost = new Post({ title, content, author_id, category_id, visible, main_page });

        // Validar los datos del post
        const validationError = Post.validate(newPost);
        if (validationError) {
            throw new Error(validationError);  // Lanzar error si la validación falla
        }

        // Ejecutar la consulta SQL para insertar el post usando db.query, con promesas
        const query = 'INSERT INTO confin_web.posts (title, content, author_id, category_id, visible, main_page) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [title, content, author_id, category_id, visible, main_page];

        const result = await new Promise((resolve, reject) => {
            db.query(query, values, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });        

        if (!result || !result.insertId) {
            throw new Error("Respuesta inesperada al insertar el post");
        }

        // Retornar el ID del nuevo post
        return result.insertId;
    } catch (error) {        
        throw new Error(`Error en la base de datos: ${error.message}`);
    }
};

// Obtener todos los posts
export const getAllPosts = async () => {
    try {
        const query = 'SELECT * FROM confin_web.posts WHERE main_page = 1 ORDER BY created_at DESC';
        const result = await new Promise((resolve, reject) => {
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return result;
    } catch (error) {
        throw new Error('Error al obtener los posts: ' + error.message);
    }
};

// Obtener todos los posts
export const getAllPostsCategoryId = async (id) => {
    try {
        const query = 'SELECT * FROM confin_web.posts WHERE category_id = ? ORDER BY created_at DESC';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return result;
    } catch (error) {
        throw new Error('Error al obtener los posts: ' + error.message);
    }
};

// Obtener un post por ID
export const getPostById = async (id) => {
    try {
        const query = 'SELECT * FROM confin_web.posts WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return result.length ? result[0] : null;
    } catch (error) {
        throw new Error('Error al obtener el post por ID: ' + error.message);
    }
};

// Actualizar un post por ID
export const updatePostById = async (id, title, content, author_id, category_id, visible, main_page) => {
    try {
        const updatedPost = new Post({ id, title, content, author_id, category_id, visible, main_page });

        // Validar el post antes de actualizarlo
        const error = Post.validate(updatedPost);
        if (error) throw new Error(error);

        const query = 'UPDATE confin_web.posts SET title = ?, content = ?, author_id = ?, category_id = ?, visible = ?, main_page = ? WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [updatedPost.id, updatedPost.title, updatedPost.content, updatedPost.author_id, updatedPost.category_id, updatedPost.visible, updatedPost.main_page], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error al actualizar el post: ' + error.message);
    }
};

// Eliminar un post por ID
export const deletePostById = async (id) => {
    try {
        const query = 'DELETE FROM confin_web.posts WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error al eliminar el post: ' + error.message);
    }
};