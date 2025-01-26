import { getOnlineCharsService, getOnlineUsersCharsService, getOnlineCharsCountService } from '../../services/wow/statusService.js';

// Obtiene lista personajes online (incluye bots)
export const getOnlineChars = async (req, res) => {
    try {
        // Consultar el servicio para obtener los personajes online
        const onlineCharacters = await getOnlineCharsService();

        // Devolver la lista de personajes como JSON
        res.status(200).json(onlineCharacters);
    } catch (error) {
        console.error("Error al obtener personajes online:", error);
        res.status(500).json({ message: "Error al obtener personajes online", error: error.message });
    }
};

// Obtiene lista personajes de usuarios online (excluye bots)
export const getOnlineUsersChars = async (req, res) => {
    try {
        // Consultar el servicio para obtener los personajes online
        const onlineCharacters = await getOnlineUsersCharsService();

        // Devolver la lista de personajes como JSON
        res.status(200).json(onlineCharacters);
    } catch (error) {
        console.error("Error al obtener personajes online:", error);
        res.status(500).json({ message: "Error al obtener personajes online", error: error.message });
    }
};

// obtiene cuenta de personajes online (incluye bots)
export const getOnlineCharsCount = async (req, res) => {
    try {
        // Consultar el servicio para obtener los personajes online
        const count = await getOnlineCharsCountService();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error al obtener personajes online:", error);
        res.status(500).json({ message: "Error al obtener personajes online", error: error.message });
    }
};