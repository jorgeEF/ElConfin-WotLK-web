import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegistroWow = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [okMessage, setOkMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // URL del backend
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/wow/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Intentamos parsear la respuesta solo si es exitosa
      const data = await response.json();

      if (response.ok) {
        setOkMessage(data.message);
        setErrorMessage('');
      } else {
        // Manejo de errores basado en el código de respuesta
        if (response.status === 409) {
          setErrorMessage('El nombre de usuario ya está en uso.');
          setOkMessage('');
        } else if (response.status === 500) {
          setErrorMessage('Hubo un error interno en el servidor.');
          setOkMessage('');
        } else {
          setErrorMessage(data.message || 'Error en el registro. Intenta de nuevo.');
          setOkMessage('');
        }
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
      setErrorMessage('Error en la conexión con el servidor.');
      setOkMessage('');
    }
  };

  return (
    <div className="container bg-light mt-5 p-5" id='registro'>
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <span className="badge text-bg-primary w-100 fs-3 p-5">
            El Confín: World of Warcraft
          </span>
        </div>
      </div>      
      <div className="card shadow mt-5 w-50 ms-auto me-auto">
        <div className="card-body">
          <h3 className="card-title text-center">Creación de cuenta</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa el nombre de usuario..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email..."
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
                placeholder="Ingresa una contraseña..."
                required
              />
            </div>
            {okMessage && <div className="alert alert-success">{okMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className='botones d-flex gap-2'>
              <Link to="/wow">
                <button className='btn btn-secondary'>Volver</button>
              </Link>
              <button type="submit" className="btn btn-primary ms-auto me-1">
                Crear cuenta
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
