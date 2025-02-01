export default class Post {
    constructor({ id, title, content, author_id, category_id, created_at, visible, main_page }) {
        this.id = id || null;
        this.title = title;
        this.content = content;
        this.author_id = author_id;
        this.category_id = category_id;
        this.created_at = created_at || new Date();
        this.visible = visible !== undefined ? visible : 1; // Por defecto visible (1)
        this.main_page = main_page !== undefined ? main_page : 0; // Por defecto 0
    }

    static validate(post) {
        if (!post.title || typeof post.title !== 'string' || post.title.length > 50) 
            return 'El título es obligatorio y no debe exceder 50 caracteres';
        if (!post.content || typeof post.content !== 'string') 
            return 'El contenido es obligatorio';
        if (!post.author_id || typeof post.author_id !== 'number') 
            return 'El autor es obligatorio y debe ser un número';
        if (post.category_id === undefined || post.category_id === null || isNaN(Number(post.category_id))) 
            return 'La categoría es obligatoria y debe ser un número válido';
        if (post.visible !== 0 && post.visible !== 1) 
            return 'El campo visible debe ser 0 o 1';
        if (post.main_page !== 0 && post.main_page !== 1) 
            return 'El campo en pagina principal debe ser 0 o 1';
        return null; // Sin errores
    }
}