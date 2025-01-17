import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de inicio de sesión
    console.log('Login submitted:', { username, password });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-5">
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
                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
