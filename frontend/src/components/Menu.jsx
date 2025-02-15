import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Menu = () => {
  const { user, logout } = useAuth(); // Usamos `logout` en lugar de `handleLogout`

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container">
        <div className="col-md-9 d-flex justify-content-start ms-3 gap-3">
          <Link to="/" className="btn btn-outline-primary">
            Inicio
          </Link>        
          <Link to="/wow" className="btn btn-primary">
              World of Warcraft
          </Link>
        </div>
        <div className="col-md-2 d-flex justify-content-end me-3">
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
                {user.role !== 3 && 
                  <li>
                    <Link to="/adm/publicar" className="dropdown-item">
                      Crear publicación
                    </Link>
                  </li>
                }
                <li>
                  <Link to="/user/perfil" className="dropdown-item">
                    Mi perfíl
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
              <button className="btn btn-outline-primary">Iniciar sesión</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
