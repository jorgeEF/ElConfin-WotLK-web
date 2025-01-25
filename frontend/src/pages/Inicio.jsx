import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

export const Inicio = () => {    

  return (
    <div className="container bg-light text-center mt-5 border rounded-1 p-5" id='inicio'>
          <div className='row d-flex justify-content-center'>
            <div className='col-md-12'>
              <span className="badge text-bg-secondary w-100 fs-2 p-5">El Confín Gaming</span>
            </div>          
          </div>
          <div className='row d-flex justify-content-center mt-3'>
            <div className='col-md-10 d-flex flex-column align-items-center'>
              <span className="badge text-bg-secondary w-100 fs-6 mb-3">Novedades</span>              
              <div className='novedades' id='novedades'>Abrimos el servidor de World of Warcraft! </div>
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