import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Submenu } from '../../components/wow/Submenu'

export const GuiaBots = () => {

  return (
    <div className="container bg-light mt-5 p-5 border rounded">
      <Submenu />

      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-md-12 d-flex flex-column align-items-center' id='guiaBots'>
          <div className="card">
            <div className="card-header text-bg-primary text-center">Guía básica de bots (playerbots)</div>
              <div className="container p-3">                
                <p><u>Existen dos tipos de bots:</u> <br />    
                
                1. Los <b>"rndbot"</b> son independientes y podes interactuar con ellos como si se tratara de jugadores humanos: <br />
                Permiten formar party/grupo para completar misiones, comerciar, ingresan al buscador de masmorras, campos de batalla, etc. <br />
                <br />
                2. Los <b>"playerbot"</b> son bots creados por el jugador. Estos se conectan sólo cuando su creador los invoca y sólo le obedecen él. <br />
                Los jugadores pueden invocar a sus alts como playerbot para hacer misiones, masmorras, etc.<br />
                <br />
                Accedé al manual de comandos de bots <a href="https://github.com/whipowill/wow-addon-playerbots/blob/master/MANUAL.md" target='_blank'>acá</a>
                <br />                
                Addon para controlar bots (recomendado): <a href="https://github.com/noisiver/unbot-addon/archive/refs/heads/english.zip" target='_blank'>Unbot</a>
                <br />
                <br />
                Controlando los bots con el addon: <br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ZGn5BxQeZSw?si=vtYh2CTNB0QGC7lN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </p>
              </div>
          </div>
        </div>
      </div>      
    </div>
  );
};