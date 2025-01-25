import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de inicio de sesión
    console.log('Login submitted:', { username, password });
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id='login'>
      <div className="card shadow mt-5 w-25">
        <div className="card-body">
          <h3 className="card-title text-center">Iniciar sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña..."
                required
              />
            </div>
            <div className='botones d-flex justify-content-center gap-5'>
              <Link to="/">
                  <button className='btn btn-secondary'>Volver</button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </div>
            
          </form>
          <div className='crearCuenta text-center mt-4'>
            <p>Aun no tenes cuenta? <a href="./registro"> registrate!</a></p>
          </div>          
        </div>
      </div>
    </div>
  );
};
