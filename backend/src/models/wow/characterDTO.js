class CharacterDTO {
    /**
     * Constructor para inicializar el objeto CharacterDTO.
     * @param {number} guid - El identificador único del personaje.
     * @param {number} account - El identificador único de la cuenta del jugador.
     * @param {string} name - El nombre del personaje.
     * @param {number} race - El identificador de la raza del personaje.
     * @param {number} charClass - El identificador de la clase del personaje.
     * @param {number} online - Estado del personaje (0 = offline, 1 = online).
     */
    constructor(guid, account, name, race, charClass, online) {
        this.guid = guid; // Identificador único
        this.account = account; // Identificador de cuenta
        this.name = name; // Nombre del personaje
        this.race = race; // Raza (tinyint en la base de datos)
        this.class = charClass; // Clase (tinyint en la base de datos)
        this.online = online; // Estado online (0 o 1)
    }

    /**
     * Método para convertir el objeto a un JSON limpio.
     * @returns {object} Objeto JSON con las propiedades definidas.
     */
    toJSON() {
        return {
            guid: this.guid,
            account: this.account,
            name: this.name,
            race: this.race,
            class: this.class,
            online: this.online,
        };
    }

    /**
     * Método estático para crear una instancia desde un objeto de base de datos.
     * @param {object} dbRow - Fila obtenida desde la base de datos.
     * @returns {CharacterDTO} Nueva instancia de CharacterDTO.
     */
    static fromDatabaseRow(dbRow) {
        return new CharacterDTO(
            dbRow.guid,
            dbRow.account,
            dbRow.name,
            dbRow.race,
            dbRow.class,
            dbRow.online
        );
    }
}

export default CharacterDTO;
