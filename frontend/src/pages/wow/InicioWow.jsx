import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Submenu } from '../../components/wow/Submenu'
import { marked } from 'marked';

export const InicioWow = () => {
  const [novedadesWow, setNovedadesWow] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL = import.meta.env.VITE_API_URL;
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/post/cat/2`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
          setNovedadesWow(data);
        } else {
          setErrorMessage(data.message || 'Error al obtener las novedades.');
        }
      } catch (error) {
        console.error('Error al comunicarse con la API:', error);
        setErrorMessage('Hubo un problema al conectarse con el servidor.');
      }
    };

    fetchData();
  }, [API_URL]);

  // Calcular el índice inicial y final de los elementos a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const novedadesPaginadas = novedadesWow.slice(startIndex, endIndex);

  // Manejo de paginación
  const totalPages = Math.ceil(novedadesWow.length / itemsPerPage);

  return (
    <div className="container bg-light mt-5 p-5 border rounded" id='inicioWow'>      
      <Submenu />

      <div className='row d-flex justify-content-center mt-5'>
        <div className='row w-75'>
          <span className="badge text-bg-primary fs-6 mb-3">Novedades</span>
        </div>
        <div className='row w-75'>
          <div className='novedades' id='novedades'>
            {novedadesPaginadas.map((novedad, index) => (
              <div className="card mb-3" key={index}>
                <div className='text-end me-2 fecha'>
                  {new Intl.DateTimeFormat('es-ES', {
                    dateStyle: 'short'
                  }).format(new Date(novedad.created_at))}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{novedad.title}</h5>
                  <p className="card-text mt-2" dangerouslySetInnerHTML={{ __html: marked(novedad.content) }} />
                  {/* <a href="#" className="card-link">Comentarios</a> */}
                  {/* <a href="#" className="card-link">Me gusta</a> */}
                </div>
              </div>
            ))}
          </div>

          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

        </div>
        {novedadesWow.length > 3 && <div className='row w-75'>
          {/* Controles de paginación */}
          <div className="pagination mt-4 d-flex justify-content-center">
            <button
              className="btn btn-sm btn-outline-secondary mx-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              className="btn btn-sm btn-outline-secondary mx-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};