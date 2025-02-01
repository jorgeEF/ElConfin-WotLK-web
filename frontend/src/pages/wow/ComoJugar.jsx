import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Submenu } from '../../components/wow/Submenu'

export const ComoJugar = () => {

  return (
    <div className="container bg-light mt-5 p-5 border rounded">
      <Submenu />

      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-md-12 d-flex flex-column align-items-center' id='comoJugar'>
          <div className="card text-bg-primary">
            <div className="card-header text-center">Guía básica</div>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">Crea tu cuenta en el servidor en "Crear cuenta"</li>
              <li className="list-group-item">Descargá el cliente 3.3.5a -necesitas un cliente bittorent- y descomprimilo a donde quieras.</li>
              <li className="list-group-item">Entra a la carpeta donde lo descomprimiste e ingresá a la subcarpeta <b>Data/esMX</b>.</li>
              <li className="list-group-item">Hace click derecho en realmlist.wtf, click en propiedades, desmarcá "solo lectura" y acepta.</li>
              <li className="list-group-item">Hace click derecho en realmlist.wtf, abrir con... seleccioná "bloc de notas".</li>
              <li className="list-group-item">Eliminá todo el contenido, luego agregá: <span className='text-primary'>set realmlist confin.ddns.net</span> y guardá el archivo.</li>
              <li className="list-group-item">Ya podes abrir el juego e ingresar con los datos de tu cuenta!</li>
            </ol>
          </div>
        </div>
      </div>      
    </div>
  );
};