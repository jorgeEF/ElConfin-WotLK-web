import { db_wow_characters } from '../../config/db.js';
import CharacterDTO from '../../models/wow/characterDTO.js';

// Obtener informacion de personajes online
export const onlineCharsStatus = async () => {
    try {
        // Crear una promesa para realizar la consulta a la base de datos
        const results = await new Promise((resolve, reject) => {
            const query = `SELECT guid, account, name, race, class, online FROM characters WHERE online = 1`;
            db_wow_characters.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        // Mapear resultados a instancias de CharacterDTO
        return results.map(row => CharacterDTO.fromDatabaseRow(row));
    } catch (error) {
        console.error("Error al consultar personajes online:", error);
        throw new Error("No se pudieron obtener los personajes online");
    }
};

// Consultar cantidad de personajes online
export const onlineCharsCountStatus = async () => {
  try {
      const count = await new Promise((resolve, reject) => {
          const query = `
              SELECT COUNT(*) AS count 
              FROM characters 
              WHERE online = 1
          `;
          db_wow_characters.query(query, (error, results) => {
              if (error) return reject(error);
              resolve(results[0].count); // Retorna el número de personajes online (con bots)
          });
      });

      return count;
  } catch (error) {
      console.error("Error al consultar usuarios y bots online:", error);
      throw new Error("No se pudieron obtener los usuarios y bots online");
  }
};