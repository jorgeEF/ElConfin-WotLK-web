import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Submenu } from '../../components/wow/Submenu'

export const OnlineWow = () => {
  const [charsOnline, setCharsOnline] = useState([]);
  const [charsCountOnline, setCharsCountOnline] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Elementos por página
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;  

  useEffect(() => {  
    fetchData();
  }, [API_URL]);

  const fetchData = async () => {

    if (isFetching) return; 
    setIsFetching(true);

    try {
      const [charsResponse, charsCountResponse] = await Promise.all([
        fetch(`${API_URL}/api/wow/status/online_users_chars`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`${API_URL}/api/wow/status/online_count`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      if (!charsResponse.ok || !charsCountResponse.ok) {
        throw new Error("Error al obtener los datos del servidor.");
      }

      const charsData = await charsResponse.json();
      const charsCountData = await charsCountResponse.json();

      setCharsOnline(charsData);
      setCharsCountOnline(charsCountData);
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      setErrorMessage("Error en la conexión con el servidor.");
    }

    setTimeout(() => setIsFetching(false), 10000); // tiempo en milisegundos
  };

  // Calcular datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = charsOnline.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(charsOnline.length / itemsPerPage);

  // Lógica para limitar botones de paginación visibles
  const visiblePages = 10; // Cantidad de botones visibles en el paginado
  const getPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (startPage > 1) pages.push(1); // Siempre muestra la primera página
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages); // Siempre muestra la última página

    return pages;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container bg-light text-center mt-5 p-5 border rounded-1" id="OnlineWow">
      <Submenu />

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-12">
          <div className="row">
            <div className="col-12 d-flex gap-2 justify-content-center">              
              <button type="button" className="btn btn-sm btn-outline-primary">
                Jugadores <span className="badge text-bg-primary">{charsOnline.length}</span>
              </button>
              <button type="button" className="btn btn-sm btn-outline-primary">
                Bots <span className="badge text-bg-primary">
                  {isNaN(charsCountOnline.count - charsOnline.length) 
                    ? charsCountOnline.count 
                    : charsCountOnline.count - charsOnline.length}
                </span>
              </button>
              <button 
                onClick={fetchData} 
                className="btn btn-sm btn-outline-primary"
                disabled={isFetching} >
                {isFetching ? "Lista Actualizada" : "Actualizar lista"}
              </button>
            </div>
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="row mt-3">
            <div className="col-md-12">
              {!errorMessage && charsOnline.length > 0 ? (
                <>
                  <table className="table table-sm table-borderless table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Clase</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Facción</th>                   
                        <th scope="col">Nivel</th>
                        <th scope="col">Zona</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((char, index) => (
                        <tr key={index}>
                          <th scope="row">{char.name}</th>
                          <td>
                            <img
                              src={`/wow/clase/${char.class}.png`}
                              title={char.className}
                              alt={char.className}
                              style={{ width: "32px", height: "32px" }}
                            />
                            {/* {char.className} */}
                          </td>
                          <td>
                            <img
                              src={`/wow/raza/${char.race}-${char.gender}.png`}
                              title={char.raceName}
                              alt={char.raceName}
                              style={{ width: "32px", height: "32px" }}
                            />
                            {/* {char.raceName} */}
                          </td>
                          <td>
                            <img
                              src={`/wow/faccion/${char.faction.toLowerCase()}.png`}
                              title={char.faction}
                              alt={char.faction}
                              style={{ width: "32px", height: "32px" }}
                            />
                            {/* {char.faction} */}
                          </td>
                          <td>{char.level}</td>
                          <td>{char.zoneName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Paginación compacta */}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      {getPagination().map((page, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            page === currentPage ? "active" : ""
                          } ${page === "..." ? "disabled" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          aria-label="Next"
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              ) : (
                !errorMessage && <p className="mt-3">No hay jugadores online en este momento.</p>
              )}
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};
