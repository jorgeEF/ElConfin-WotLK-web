import * as postService from '../services/postService.js';

// Crear un nuevo post
export const createPost = async (req, res) => {
    try {        
        const { title, content, author_id, category_id, visible } = req.body;

        // Llamada al servicio para crear el post
        const postId = await postService.createPost(title, content, author_id, category_id, visible);

        if (!postId) {
            return res.status(500).json({ message: 'Error al obtener el ID del post' });
        }

        res.status(201).json({ message: 'Post creado exitosamente', postId });
    } catch (error) {        
        res.status(500).json({ message: 'Error al crear el post', error: error.message });
    }
};

// Obtener todos los posts
export const getAllPost = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
    }
};

// Obtener todos los posts de una categoria
export const getAllPostCategory = async (req, res) => {
    try {        
        const posts = await postService.getAllPostsCategoryId(req.params.id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
    }
};

// Obtener un post por ID
export const getPost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post no encontrado' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el post', error: error.message });
    }
};

// Actualizar un post por ID
export const updatePost = async (req, res) => {
    try {
        const { title, content, author_id, category_id, visible } = req.body;
        const updated = await postService.updatePostById(req.params.id, title, content, author_id, category_id, visible);
        if (!updated) return res.status(404).json({ message: 'Post no encontrado' });
        res.status(200).json({ message: 'Post actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
    }
};

// Eliminar un post por ID
export const deletePost = async (req, res) => {
    try {
        const deleted = await postService.deletePostById(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Post no encontrado' });
        res.status(200).json({ message: 'Post eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post', error: error.message });
    }
};
