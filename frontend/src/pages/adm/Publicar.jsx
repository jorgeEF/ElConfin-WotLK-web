import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

export const Publicar = () => {    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category_id, setCategoryId] = useState(1); // Categoría predeterminada
    const [main_page, setMainPage] = useState(1);
    const [okMessage, setOkMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const { user } = useAuth();
    const navigate = useNavigate();

    // si no esta logueado o es de rol usuario (id 3), redirigir a pagina principal.
    useEffect(() => {
        if (!user || user.role === 3) {
            navigate('/');
        }
    }, [user, navigate]);

    // URL del backend
    const API_URL = import.meta.env.VITE_API_URL;

    // Enumeración de categorías
    const categoriesEnum = {
        1: "Novedades",
        2: "WoW Novedades"        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpiar mensajes previos
        setOkMessage('');
        setErrorMessage('');

        // Sanitizar el contenido con DOMPurify antes de enviarlo
        const sanitizedContent = DOMPurify.sanitize(content);

        try {
            const response = await fetch(`${API_URL}/api/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({                    
                    title,
                    content: sanitizedContent,  // Enviar el contenido sanitizado
                    author_id: user.id,  // Se asigna directamente
                    category_id,
                    visible: 1,
                    main_page
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setOkMessage('Publicación creada correctamente.');

                // Redirigir a la página de inicio después de 3 segundos
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setErrorMessage(data.message || 'Error al crear la publicación.');
            }
        } catch (error) {
            console.error('Error al comunicarse con la API:', error);
            setErrorMessage('Hubo un problema al conectarse con el servidor.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center" id='login'>
            <div className="card shadow mt-5 w-25">
                <div className="card-body">
                    <h3 className="card-title text-center">Crear publicación</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ingresa un título..."
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Contenido</label>
                            {/* Reemplazar textarea por React Quill */}
                            <ReactQuill 
                                id="content"
                                value={content}
                                onChange={setContent}
                                placeholder="Ingresa el contenido..."
                                theme="snow"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoría</label>
                            <select 
                                className="form-select" 
                                id="category" 
                                value={category_id}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                            >
                                {Object.entries(categoriesEnum).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>                        
                        <div className="mb-3 form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="mainPage"
                                checked={main_page === 1}
                                onChange={(e) => setMainPage(e.target.checked ? 1 : 0)}
                            />
                            <label className="form-check-label" htmlFor="mainPage">
                                Mostrar en Inicio
                            </label>
                        </div>
                        <div className='botones d-flex justify-content-center gap-5'>
                            <Link to="/">
                                <button type="button" className='btn btn-secondary'>Volver</button>
                            </Link>
                            <button type="submit" className="btn btn-primary">Crear publicación</button>
                        </div>
                    </form>
                    
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    {okMessage && <div className="alert alert-success mt-3">{okMessage}</div>}                    
                </div>
            </div>
        </div>
    );
};
