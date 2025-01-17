import { Outlet } from "react-router-dom";
import { Encabezado } from '../components/Encabezado'
import { Menu } from '../components/Menu'
import { PieDePagina } from '../components/PieDePagina'

export const Layout = () => {
    return (
      <div className="container-fluid d-flex flex-column min-vh-100 px-0 px-sm-0">
        {/* <Encabezado /> */}
        <Menu />
        <Outlet />
        <div className="mt-auto">
          <PieDePagina />
        </div>      
      </div>
    );
};