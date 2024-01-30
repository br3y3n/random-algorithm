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


// Function to shuffle an array randomly
function randomizeArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

// Function to get a random active team
async function getRandomTeam(teams) {
    return new Promise((resolve) => {
        // Filter active teams
        const activeTeams = teams.filter((team) => team.status === "active");

        if (activeTeams.length > 0) {
            // If there are active teams, resolve with a random active team
            resolve(activeTeams[Math.floor(Math.random() * activeTeams.length)]);
        } else {
            // If no active teams, select a random team from either lost or the whole array
            const lostTeams = teams.filter((team) => team.status === "lost");
            const selectedTeam =
                lostTeams.length > 0
                    ? lostTeams[Math.floor(Math.random() * lostTeams.length)]
                    : teams[Math.floor(Math.random() * teams.length)];

            resolve(selectedTeam);
        }
    });
}

// Function to print a tournament phase
async function printPhase(teams, phaseElement) {
    phaseElement.innerHTML = "";
    for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        const matchupElement= document.createElement("div")
        matchupElement.classList.add("matchup")
        if (team2) {
            // Print matchup between two teams
            matchupElement.textContent = `${team1.name} VS ${team2.name}`
        } else {
            // If there's an odd number of teams, include a random team in a matchup
            const randomTeam = await getRandomTeam(teams);
            matchupElement.textContent = `${team1.name} VS ${randomTeam.name}`;
        }

        // Separator for better readability
       
    phaseElement.appendChild(matchupElement);

    
    }
}

// Function to simulate a tournament
async function tournament(teams) {
    const numberOfPhases = Math.log2(teams.length);
    let teamsInPlay = teams.slice(); // Make a copy to avoid modifying the original array

    for (let i = 0; i < numberOfPhases; i++) {
        
        console.log(`PHASE ${i + 1}`);
        const phaseElement = document.createElement("div");
        phaseElement.classList.add("phase"); // Use "phase" class for consistency
        document.getElementById("tournament-phases").appendChild(phaseElement);
    
        // Create and append the phase header before calling printPhase
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

            // Determine the winner randomly
            const winner = Math.random() < 0.5 ? team1 : team2;
            nextTeams.push({ name: winner.name, status: "active" });

            // Update the status of the losing team (if applicable)
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

// Run the tournament with a randomly shuffled array of teams
tournament(randomizeArray(teams));
