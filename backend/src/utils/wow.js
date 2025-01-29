// enums.js
export const RaceEnum = {
    1: "Humano",
    2: "Orco",
    3: "Enano",
    4: "Elfo de la Noche",
    5: "No Muerto",
    6: "Tauren",
    8: "Gnomo",
    9: "Troll",
    914: "Elfo de Sangre",
    927: "Draenei",
};

export const FactionEnum = {
    ALIANZA: "Alianza",
    HORDA: "Horda",
};

export const getFactionByRace = (race) => {
    const allianceRaces = [1, 3, 4, 8, 927]; // Humanos, Enanos, Elfos de la Noche, Gnomos, Draenei
    const hordeRaces = [2, 5, 6, 9, 914]; // Orcos, No Muertos, Tauren, Trolls, Elfos de Sangre

    if (allianceRaces.includes(race)) {
        return FactionEnum.ALIANZA;
    }
    if (hordeRaces.includes(race)) {
        return FactionEnum.HORDA;
    }
    return "Desconocido"; // En caso de error
};
