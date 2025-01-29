// enums.js

export const ClassEnum = {
    1: "Guerrero/a",
    2: "Paladín",
    3: "Cazador/a",
    4: "Pícaro/a",
    5: "Sacerdote/a",
    6: "",
    7: "Chamán",
    8: "Mago/a",
    9: "Brujo/a",
    10: "",
    11: "Druida",
};

export const RaceEnum = {
    1: "Humano",
    2: "Orco",
    3: "Enano",
    4: "Elfo de la Noche",
    5: "No Muerto",
    6: "Tauren",
    8: "Gnomo",
    9: "Troll",
    10: "Elfo de Sangre",
    11: "Draenei",
};

export const FactionEnum = {
    ALIANZA: "Alianza",
    HORDA: "Horda",
};

export const getFactionByRace = (race) => {
    const allianceRaces = [1, 3, 4, 8, 11]; // Humanos, Enanos, Elfos de la Noche, Gnomos, Draenei
    const hordeRaces = [2, 5, 6, 9, 10]; // Orcos, No Muertos, Tauren, Trolls, Elfos de Sangre

    if (allianceRaces.includes(race)) {
        return FactionEnum.ALIANZA;
    }
    if (hordeRaces.includes(race)) {
        return FactionEnum.HORDA;
    }
    return "Desconocido"; // En caso de error
};
