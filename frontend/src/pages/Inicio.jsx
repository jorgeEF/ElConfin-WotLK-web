import React, { useState } from 'react';
import './Inicio.css';

export const Inicio = () => {    

  return (
    <div className="container bg-light text-center mt-5 border rounded-1" id='inicio'>        
            <div className="titulo">Bienvenidos a El Confín WotLK</div>            
            <div className='noticias' id='noticias'></div>
            <div className='realmlist'><p>set realmlist confin.ddns.net</p></div>
    </div>
      
  );
};