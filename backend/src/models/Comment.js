export default class Comment {
    constructor({ id, author_id, post_id, content, created_at, visible }) {
        this.id = id || null;
        this.author_id = author_id;
        this.post_id = post_id;
        this.content = content;
        this.created_at = created_at || new Date();
        this.visible = visible !== undefined ? visible : 1; // Por defecto visible (1)
    }

    static validate(comment) {
        if (!comment.author_id || typeof comment.author_id !== 'number') 
            return 'El autor es obligatorio y debe ser un número';
        if (!comment.post_id || typeof comment.post_id !== 'number') 
            return 'El post asociado es obligatorio y debe ser un número';
        if (!comment.content || typeof comment.content !== 'string') 
            return 'El contenido es obligatorio';        
        return null; // Sin errores
    }
}