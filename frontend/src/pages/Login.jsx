import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [okMessage, setOkMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // URL del backend
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setOkMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Mostrar mensaje de éxito
        setOkMessage('Usuario autenticado correctamente.');

        // Limpiar campos
        setUsername('');
        setPassword('');

        // Redirigir a la página de inicio después de 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      setErrorMessage('Hubo un problema al conectarse con el servidor.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id='login'>
      <div className="card shadow mt-5 w-25">
        <div className="card-body">
          <h3 className="card-title text-center">Iniciar sesión</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {okMessage && <div className="alert alert-success">{okMessage}</div>}
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
                <button type="button" className='btn btn-secondary'>Volver</button>
              </Link>
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </div>
          </form>
          <div className='crearCuenta text-center mt-4'>
            <p>Aún no tienes cuenta? <Link to="./registro">Regístrate!</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
