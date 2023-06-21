//// game list /////////////////////////////////////////////////////////
const gameCont = document.getElementById('game-list');

const gameName = gameCont.querySelector('.game_name');
const userName = gameCont.querySelector('.user_name');
const userEmail = gameCont.querySelector('.user_email');

const dataList = gameCont.querySelector('.data_list');
const lists = gameCont.querySelector('.lists');

//// lotto /////////////////////////////////////////////////////////////
const container = document.getElementById('container');
const callingNumbers = container.querySelector('.calling_numbers');

const lotteryCard = container.querySelector('.card');
const randNum = container.querySelector('.numbers');
const cardRow1 = container.querySelector('.card_row1');
const cardRow2 = container.querySelector('.card_row2');
const cardRow3 = container.querySelector('.card_row3');
const gameOver = container.querySelector('.game-over');

const clickPlay = container.querySelector('.play_click');
const clickStop = container.querySelector('.stop_click');
const clickAgain = container.querySelector('.try_again');

const allCardRows = lotteryCard.children;

let allNumbers = [];
let ticketArr = [];

let checkWin = 0;
let callNums;
let showGameOver;

pushAllNumbers(allNumbers);

getAllGames().then(game => {
    rendLists(game);
    console.log(game)
})

function createGame () {
    addGames();
    createGameRequest().then(() => {
        return getAllGames();
    }).then(game => {
        rendLists(game);
    });
    clearInputes();
}

function joinGame (id) {
    gameCont.style.display = 'none';
    container.style.display = 'block';
    getGame(id).then(game => {
        localStorage.setItem('gameId', game[0].id);
        let gameId = localStorage.getItem('gameId');
        if (gameId) {
            return getTicket(gameId);
        } else {
            return getGame(id)
        }
    }).then(ticket => {
        console.log(ticket)
    }).catch(() => {
        console.log('err')
    })
}

function addGames () {
    let game = {
        name: gameName.value,
        username: userName.value,
        email: userEmail.value,
    };
    games = game;
}

function rendLists (game) {
    lists.innerHTML = '';
    game.map((e) => {
        lists.innerHTML += `<div class="game-list" onclick="joinGame('${e.id}')">
                                    <div>${e.name}</div>
                                    <div>${e.creator.username}</div>
                               </div>`
    }) 
}

function clearInputes () {
    gameName.value = '';
    userName.value = '';
    userEmail.value = '';
}

function emptyAreasErrorValidation () {

}


function playGame () {
    createNumber();
    changeClick('none', 'inline-block')
}

function stopGame () {
    clearInterval(callNums);
    changeClick('inline-block', 'none')
}

function newGame () {
    clearInterval(callNums);
    CreateNewGame();
}

function setTheNumber (e) {
    closeNumber(e)
}

//// game play /////////////////////////////////////////////////////////
function createNumber () {
    clearInterval(callNums);
    callNums = setInterval(() => {
        rendCallingNumbers();
        winShower();
    }, 2 * 1000);
}

function rendCallingNumbers () {
    if (allNumbers.length === 0) {
        clearInterval(callNums);
        clearInterval(showGameOver);
        showGameOver = setTimeout(() => {
            if (checkWin !== 15) {
                gameOver.innerText = 'Game Over. You Lost!';
                randNum.innerHTML = '';
                changeClick('none', 'none', 'inline-block');
            } else {
                winShower();
            }
        }, 4 * 1000);
    } else {
        randNum.innerHTML = `<div>${callRandomNumber(allNumbers)}</div>`;
    }
}

function winShower () {
    if (checkWin === 15) {
        clearInterval(callNums);
        gameOver.innerText = 'You Win!';
        randNum.innerHTML = '';
        clickAgain.style.display = 'inline-block';
        clickAgain.innerText = 'New Game';
    }
}

function closeNumber (e) {
    // getTicketNums().then(num => {
    //     for (let i = 0; i < num.length; i++) {
    //         for (let j = 0; j < num[i].length; j++) {
    //             if (!num[i][j].checked) {
    //                 e.target.innerHTML = `<div class="number-out">${e.target.innerText}</div>`;
    //                 num[i][j].checked = true;
    //             }
    //         }
    //     }
    //     console.log(num)
    // })
}

function changeClick (play, stop, again) {
    clickPlay.style.display = play;
    clickStop.style.display = stop;
    clickAgain.style.display = again;
}

function CreateNewGame () {
    changeClick('inline-block', 'none', 'none');
    gameOver.innerText = '';
    allNumbers = [];
    checkWin = 0;
    pushAllNumbers(allNumbers);
    clearAllAreas();
    rendNums();
}

function clearAllAreas () {
    for(let i = 0; i < allCardRows.length; i++) {
        allCardRows[i].innerHTML = '';
    }
    callingNumbers.innerHTML = '';
}

//// create all numbers ////////////////////////////////////////////////

function rendNums (num) {
        for(let i = 0; i < num.length; i++) {
            for(let j = 0; j < num[i].length; j++) {
                if(!num[i][j].empty) {
                    allCardRows[i].innerHTML += `<div onclick="setTheNumber(event)">${num[i][j].value}</div>`;
                } else {
                    allCardRows[i].innerHTML += `<div></div>`;
                }
            }
        }
}

function pushAllNumbers (arr) {
    for (let i = 1; i < 90; i++) {
        arr.push(i);
    }
}

function callRandomNumber (arr) {
    let index = Math.floor(Math.random() * arr.length);
    let randomNum = arr.splice(index, 1)[0];
    callingNumbers.innerHTML += `<div>${randomNum}</div>`;
    return randomNum;
}