const teams = [
    { name: "Atlético Nacional", status: "active" },
    { name: "Millonarios FC", status: "active" },
    { name: "Independiente Medellín", status: "active" },
    { name: "Deportivo Cali", status: "active" },
    { name: "Junior FC", status: "active" },
    { name: "América de Cali", status: "active" },
    { name: "Santa Fe", status: "active" },
    { name: "Deportes Tolima", status: "active" },
    { name: "Atlético Huila", status: "active" },
    { name: "Once Caldas", status: "active" },
    { name: "Envigado FC", status: "active" },
    { name: "Cúcuta Deportivo", status: "active" },
    { name: "Patriotas FC", status: "active" },
    { name: "Jaguares de Córdoba", status: "active" },
    { name: "Alianza Petrolera", status: "active" },
    { name: "Deportivo Pasto", status: "active" },
    { name: "Atlético Bucaramanga", status: "active" },
    { name: "Boyacá Chicó FC", status: "active" },
    { name: "La Equidad", status: "active" },
    { name: "Unión Magdalena", status: "active" },
    { name: "Atlético Junior", status: "active" }
];


// función para mezclar el array de jugadores aleatoriamente
function randomizeArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

// Función para conseguir un equipo activo ramdon.
async function getRandomTeam(teams) {
    return new Promise((resolve) => {
        // Filtrar equipos activos
        const activeTeams = teams.filter((team) => team.status === "active");

        if (activeTeams.length > 0) {
            // Si hay equipos activos, se resuelve la promesa y retorna un equipo activo aleatorio
            resolve(activeTeams[Math.floor(Math.random() * activeTeams.length)]);
        } else {
            // Si no hay equipos activos, seleccionea un equipo aleatorio de los perdidos o de todo el conjunto.
            const lostTeams = teams.filter((team) => team.status === "lost");
            const selectedTeam =
                lostTeams.length > 0
                    ? lostTeams[Math.floor(Math.random() * lostTeams.length)]
                    : teams[Math.floor(Math.random() * teams.length)];

            resolve(selectedTeam);
        }
    });
}

// Función para imprimir una fase del torneo.
async function printPhase(teams, phaseElement) {
    phaseElement.innerHTML = "";
    for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        const matchupElement= document.createElement("div")
        matchupElement.classList.add("matchup")
        if (team2) {
            // imprime enfrentamiento entre dos equipos
            matchupElement.textContent = `${team1.name} VS ${team2.name}`
        } else {
            // Si hay un número impar de equipos, incluye un equipo aleatorio en un enfrentamiento.
            const randomTeam = await getRandomTeam(teams);
            matchupElement.textContent = `${team1.name} VS ${randomTeam.name}`;
        }

        // separador para una mejor legibilidad
       
    phaseElement.appendChild(matchupElement);

    
    }
}

// Funcion para simular un torneo
async function tournament(teams) {
    const numberOfPhases = Math.log2(teams.length);
    let teamsInPlay = teams.slice(); // hacer una copia para evitar modificar el array original

    for (let i = 0; i < numberOfPhases; i++) {
        
        console.log(`PHASE ${i + 1}`);
        const phaseElement = document.createElement("div");
        phaseElement.classList.add("phase"); // Use "phase" class for consistency
        document.getElementById("tournament-phases").appendChild(phaseElement);
    
        // cree y agregue el encabezado de fase antes de llamar a printPhase
        const phaseHeader = document.createElement("div");
        phaseHeader.classList.add("phase-header");
        phaseHeader.textContent = `PHASE ${i + 1}`;
        console.log(phaseHeader)
        phaseElement.appendChild(phaseHeader);
    
        await printPhase(teamsInPlay, phaseElement);
        const nextTeams = [];

        for (let j = 0; j < teamsInPlay.length; j += 2) {
            const team1 = teamsInPlay[j];
            const team2 = teamsInPlay[j + 1];

            // determinar el ganador al azar
            const winner = Math.random() < 0.5 ? team1 : team2;
            nextTeams.push({ name: winner.name, status: "active" });

            // Actualizar el estado del equipo perdedor (si corresponde)
            if (team2 === undefined) {
                team1.status = team2 === winner ? "active" : "lost";
            } else {
                team1.status = team1 === winner ? "active" : "lost";
            }
        }
        console.log(nextTeams)
        teamsInPlay = nextTeams;
    }
}

// Corremos la aplicacion llamando a la funcion principal
tournament(randomizeArray(teams));
