import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [okMessage, setOkMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // URL del backend
  const API_URL = import.meta.env.VITE_API_URL;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes de error o éxito
    setOkMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          username,
          email,
          password,
          captchaToken        
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOkMessage('Usuario registrado exitosamente.');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      setErrorMessage('Hubo un problema al conectarse con el servidor.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id='registro'>
      <div className="card shadow mt-5 w-25">
        <div className="card-body">
          <h3 className="card-title text-center">Registro de usuarios</h3>
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

            {/* reCAPTCHA */}
            <div className="mb-3">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            
            {okMessage && <div className="alert alert-success">{okMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className='botones d-flex justify-content-center gap-5'>
              <Link to="/">
                <button className='btn btn-secondary' type="button">Volver</button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
