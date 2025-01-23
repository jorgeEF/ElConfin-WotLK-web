import React, { useState } from 'react';
import './Inicio.css';

export const Inicio = () => {    

  return (
    <div className="container bg-light text-center mt-5 border rounded-1" id='inicio'>    
            <div className="titulo mt-5">Bienvenidos a El Confín WotLK</div>        
            <div className='noticias' id='noticias'></div>
            <div className='descargaCliente mt-5' id='descargaCliente'>Descargar cliente: <a href="magnet:?xt=urn:btih:22fdc86e14bb39a784c9172743b407d5293026e1&dn=%5BUltimoWoW%5D%20Client%20esMX.zip&tr=http%3A%2F%2F184.105.151.164%3A6969%2Fannounce&tr=http%3A%2F%2F182.150.53.61%3A8080%2Fannounce&tr=http%3A%2F%2F62.210.202.61%3A80%2Fannounce&tr=http%3A%2F%2F78.30.254.12%3A2710%2Fannounce&tr=http%3A%2F%2F91.207.136.85%3A80%2Fannounce&tr=http%3A%2F%2F176.113.71.19%3A6961%2Fannounce&tr=http%3A%2F%2F34.92.10.197%3A6789%2Fannounce&tr=udp%3A%2F%2F80.209.252.132%3A1337%2Fannounce&tr=udp%3A%2F%2F62.138.0.158%3A6969%2Fannounce&tr=udp%3A%2F%2F188.241.58.209%3A6969%2Fannounce&tr=udp%3A%2F%2F93.158.213.92%3A1337%2Fannounce&tr=udp%3A%2F%2F62.210.97.59%3A1337%2Fannounce&tr=udp%3A%2F%2F151.80.120.112%3A2710%2Fannounce&tr=http%3A%2F%2F80.209.252.132%3A1337%2Fannounce">enlace magnético</a></div>
            <div className='instrucciones mt-5 mb-5 w-50 fs-6'>
              <p>Instrucciones</p>
              <ol className='list-group list-group-numbered bg-text-dark'>
                <li className='list-group-item list-group-item-light'>Ingresar a la carpeta Data/esMX</li>
                <li className='list-group-item list-group-item-light'>Hacer click derecho en realmlist.wtf, propiedades y quitar "solo lectura"</li>
                <li className='list-group-item list-group-item-light'>Hacer click derecho en realmlist.wtf y abrir/editar con editor de texto</li>
                <li className='list-group-item list-group-item-light'>Eliminar todo el contenido, agregar: set realmlist confin.ddns.net y guardar</li>
                <li className='list-group-item list-group-item-light'>Jugar!</li>
              </ol>
              
            </div>
    </div>      
  );
};