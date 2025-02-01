import { Link } from 'react-router-dom';

export const Submenu = () => {

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                <span className="badge text-bg-primary w-100 fs-3 p-5">
                    El Confín: World of Warcraft
                </span>
                </div>
            </div>
            <div className='row d-flex justify-content-center rounded mt-2 w-75 ms-auto me-auto' id='submenuWow'>
                <div className='col-md-12 d-flex justify-content-center gap-2'>
                    <div className='charsOnline' id='InicioWow'>
                        <Link to="/wow">
                        <button className='btn btn-outline-primary'>Inicio</button>
                        </Link>
                    </div>
                    <div className='charsOnline' id='charsOnline'>
                        <Link to="/wow/online">
                        <button className='btn btn-outline-primary'>Jugadores Online</button>
                        </Link>
                    </div>
                    <div className='charsOnline' id='comoJugar'>
                        <Link to="/wow/como_jugar">
                        <button className='btn btn-outline-primary'>Como Jugar?</button>
                        </Link>
                    </div>
                    <div className='descargaCliente' id='descargaCliente'>
                        <a href="magnet:?xt=urn:btih:22fdc86e14bb39a784c9172743b407d5293026e1&dn=%5BUltimoWoW%5D%20Client%20esMX.zip&tr=http%3A%2F%2F184.105.151.164%3A6969%2Fannounce&tr=http%3A%2F%2F182.150.53.61%3A8080%2Fannounce&tr=http%3A%2F%2F62.210.202.61%3A80%2Fannounce&tr=http%3A%2F%2F78.30.254.12%3A2710%2Fannounce&tr=http%3A%2F%2F91.207.136.85%3A80%2Fannounce&tr=http%3A%2F%2F176.113.71.19%3A6961%2Fannounce&tr=http%3A%2F%2F34.92.10.197%3A6789%2Fannounce&tr=udp%3A%2F%2F80.209.252.132%3A1337%2Fannounce&tr=udp%3A%2F%2F62.138.0.158%3A6969%2Fannounce&tr=udp%3A%2F%2F188.241.58.209%3A6969%2Fannounce&tr=udp%3A%2F%2F93.158.213.92%3A1337%2Fannounce&tr=udp%3A%2F%2F62.210.97.59%3A1337%2Fannounce&tr=udp%3A%2F%2F151.80.120.112%3A2710%2Fannounce&tr=http%3A%2F%2F80.209.252.132%3A1337%2Fannounce"><button className='btn btn-outline-primary'>Descargar cliente</button></a>
                    </div>
                    <div className='crearCuenta' id='crearCuenta'>
                        <Link to="/wow/registro">
                        <button className='btn btn-outline-primary'>Crear cuenta</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};