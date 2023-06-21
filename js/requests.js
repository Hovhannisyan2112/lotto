async function getAllGames () {
    const req = await fetch('http://localhost:8080/game/games', {
        method: 'GET',
        headers: {
            "Content-Type":  "application/json"
        }
    });
    
    return await req.json();
}

async function createGameRequest () {
    const req = await fetch('http://localhost:8080/game/create', {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(games)
    });
    return await req.json();
}

async function getTicket (gameId) {
    const req = await fetch(`http://localhost:8080/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        }
    });
    
    return await req.json();
}

async function getGame (gameId) {
    const req = await fetch(`http://localhost:8080/game/${gameId}`, {
        method: 'GET',
        headers: {
            "Content-Type":  "application/json"
        }
    });
    
    return await req.json();
}

async function getTicketNums (id) {
    const req = await fetch(`http://localhost:8080/ticket/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type":  "application/json"
        }
    });
    
    return await req.json();
}