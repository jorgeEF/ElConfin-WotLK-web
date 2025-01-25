import { onlineCharsStatus, onlineCharsCountStatus } from '../../services/wow/statusService.js';

export const onlineChars = async (req, res) => {
    try {
        // Consultar el servicio para obtener los personajes online
        const onlineCharacters = await onlineCharsStatus();

        // Devolver la lista de personajes como JSON
        res.status(200).json(onlineCharacters);
    } catch (error) {
        console.error("Error al obtener personajes online:", error);
        res.status(500).json({ message: "Error al obtener personajes online", error: error.message });
    }
};

export const onlineCharsCount = async (req, res) => {
    try {
        // Consultar el servicio para obtener los personajes online
        const count = await onlineCharsCountStatus();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error al obtener personajes online:", error);
        res.status(500).json({ message: "Error al obtener personajes online", error: error.message });
    }
};