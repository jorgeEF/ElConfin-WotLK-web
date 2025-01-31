import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

export const Inicio = () => {    
  const [novedades, setNovedades] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  const API_URL = import.meta.env.VITE_API_URL;
  const itemsPerPage = 3; // Número de novedades por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/post`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
          setNovedades(data);
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
  const novedadesPaginadas = novedades.slice(startIndex, endIndex);

  // Manejo de paginación
  const totalPages = Math.ceil(novedades.length / itemsPerPage);

  return (
    <div className="container bg-light text-center mt-5 border rounded-1 p-5" id='inicio'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-12'>
          <span className="badge text-bg-secondary w-100 fs-2 p-5">El Confín Gaming</span>
        </div>          
      </div>      
      <div className='row d-flex justify-content-center mt-3'>
        <div className='col-md-2 d-flex flex-column align-items-center'></div>
        <div className='col-md-8 d-flex flex-column align-items-center'>
          <div className='row w-100'>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Bienvenidos a nuestra comunidad!</h5>
                <p className="card-text">De gamers para gamers</p>                
              </div>
            </div>
          </div>
          <div className='row w-100'>
            <span className="badge text-bg-secondary w-100 fs-6 mb-3">Novedades</span>
          </div>
          <div className='row w-100'>        
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
                    <p className="card-text mt-2">{novedad.content}</p>
                    {/* <a href="#" className="card-link">Comentarios</a> */}
                    {/* <a href="#" className="card-link">Me gusta</a> */}
                  </div>
                </div>
              ))}
            </div>

            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            
          </div>
          {novedades.length>3 && <div className='row w-75'>
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
        
        <div className='col-md-2 d-flex flex-column align-items-center'>
          <div className='servidores' id='servidores'>
            <span className="badge text-bg-secondary w-100 fs-6 mb-3">Servidores</span>
            <Link to="/wow">
              <button className='btn btn-primary btn-sm'>World of Warcraft</button>
            </Link>
          </div>
        </div>
      </div>
    </div>      
  );
};
