import { Link } from 'react-router-dom';
import './Menu.css';

export const Menu = () => {

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid">            
            <div className="col-md-3">
                <Link to="/" className='text-decoration-none'>
                    Inicio
                </Link>            
            </div>
            <div className='col-md-5'> </div>
            <div className='col-md-4'> 
                <div className='d-flex justify-content-end gap-3'>
                    <Link to="/login">
                    <button className='btn btn-primary'>Iniciar sesión</button>
                    </Link>                    
                </div>
            </div>
        </div>        
    </nav>    
  );
};