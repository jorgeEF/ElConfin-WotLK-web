import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Menu = () => {
  const { user, logout } = useAuth(); // Usamos `logout` en lugar de `handleLogout`

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="col-md-3 ms-3">
          <Link to="/" className="text-decoration-none">
            Inicio
          </Link>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4 me-3">
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.username}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link to="/account" className="dropdown-item">
                    Mi cuenta
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Iniciar sesión</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
