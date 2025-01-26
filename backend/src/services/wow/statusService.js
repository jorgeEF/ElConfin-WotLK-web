import { db_wow_characters } from '../../config/db.js';
import CharacterDTO from '../../models/wow/characterDTO.js';

// Obtener informacion de personajes online
export const getOnlineCharsService = async () => {
    try {
        // Crear una promesa para realizar la consulta a la base de datos
        const results = await new Promise((resolve, reject) => {
            const query = `SELECT guid, account, name, race, class, level, online FROM characters WHERE online = 1`;
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

// Obtener información de personajes online excluyendo bots
export const getOnlineUsersCharsService = async () => {
    try {
        // Crear una promesa para realizar la consulta a la base de datos
        const results = await new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    c.guid,
                    c.account,
                    c.name,
                    c.race,
                    c.class,
                    c.level,
                    c.online
                FROM 
                    characters c
                INNER JOIN 
                    acore_auth.account a
                ON 
                    c.account = a.id
                WHERE 
                    c.online = 1
                    AND a.username NOT LIKE '%RNDBOT%';
            `;
            db_wow_characters.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        // Mapear resultados a instancias de CharacterDTO
        return results.map((row) => CharacterDTO.fromDatabaseRow(row));
    } catch (error) {
        console.error("Error al consultar personajes online:", error);
        throw new Error("No se pudieron obtener los personajes online");
    }
};

// Consultar cantidad de personajes online
export const getOnlineCharsCountService = async () => {
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