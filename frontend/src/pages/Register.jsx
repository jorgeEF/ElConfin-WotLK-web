import React, { useState } from 'react';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Para mostrar errores
  
  // URL del backend
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Intentamos parsear la respuesta solo si es exitosa
      const data = await response.json();

      if (response.ok) {
        alert(data.message); 
        setErrorMessage('');
      } else {
        // Manejo de errores basado en el código de respuesta
        if (response.status === 409) {
          setErrorMessage('El nombre de usuario ya está en uso.');
        } else if (response.status === 500) {
          setErrorMessage('Hubo un error interno en el servidor.');
        } else {
          setErrorMessage(data.message || 'Error en el registro. Intenta de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
      setErrorMessage('Error en la conexión con el servidor.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id='registro'>
      <div className="card shadow mt-5 w-25">
        <div className="card-body">
          <h3 className="card-title text-center">Registro de cuentas</h3>
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
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
