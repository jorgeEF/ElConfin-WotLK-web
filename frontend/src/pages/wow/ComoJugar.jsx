import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InicioWow.css';
import { Submenu } from '../../components/wow/Submenu'

export const ComoJugar = () => {

  return (
    <div className="container bg-light mt-5 p-5 border rounded" id='inicioWow'>
      <Submenu />

      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-md-12 d-flex flex-column align-items-center' id='instrucciones'>
          <div className="card text-bg-primary">
            <div className="card-header text-center">Instrucciones</div>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">Descargar el cliente y descomprimirlo</li>
              <li className="list-group-item">Ingresar a la carpeta Data/esMX</li>
              <li className="list-group-item">Hacer click derecho en realmlist.wtf, propiedades y quitar "solo lectura"</li>
              <li className="list-group-item">Hacer click derecho en realmlist.wtf y abrir/editar con editor de texto</li>
              <li className="list-group-item">Eliminar todo el contenido, agregar: set realmlist confin.ddns.net y guardar"</li>
              <li className="list-group-item">Ingresa los datos de tu cuenta y juga!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};