(function() {
    'use strict';
    console.log('reading js');

    const main = document.querySelector('main');
    const startGame = document.getElementById('startgame');
    const playerInputLabel = document.querySelectorAll('.players label');
    const game = document.getElementById('game');
    const gameArea = document.querySelector('#game-area');
    const gameInstructions = document.querySelector('#instructions');
    const gameInstuctionPlayerName = document.querySelector('#instruction-player-name');
    const roundCounter = document.querySelector('#round-counter');
    const dice = document.getElementsByClassName('dice');
    const rollButton = document.getElementsByClassName('roll');
    const gamePlayers = document.querySelectorAll('.players');
    const gamePlayersName = document.querySelectorAll('.players-name');
    const quitgameButton = document.getElementById('quitgame-button');
    let round = [0,0];
    let bkgColors = ['#7DA4DD','#EAA361'];
    let totalScoreOfRound = 0;
    let preScore = 0;

    console.log(game);


    var gameData = {
        dice: ['1die.png','2die.png','3die.png','4die.png','5die.png','6die.png'],
        players: [],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    }

    gameData.index = Math.round(Math.random());
    console.log(gameData.index);

    playerInputLabel.forEach(function(label){
        label.addEventListener('click', function(){
            label.className = 'label-active';
        });
    })

    startGame.addEventListener('click', function(){
        const playerNames = document.querySelectorAll('.input-names');
        if (playerNames[0].value === '') {
            gameData.players[0] = 'Player 1';
        } else {
            gameData.players[0] = playerNames[0].value;
        }
        if (playerNames[1].value === '') {
            gameData.players[1] = 'Player 2';
        }else {
            gameData.players[1] = playerNames[1].value;
        }
        main.setAttribute('class', 'game-started');
        quitgameButton.addEventListener('click', function(){
            location.reload();
        });
        gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
        gamePlayersName[0].innerText = gameData.players[0];
        gamePlayersName[1].innerText = gameData.players[1];
        setUpTurn();
        console.log('set up the turn');
    });

    function throwDice(idx){
        showCurrentScore();
        console.log('roll the dice');
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        dice[0].src = `images/${gameData.roll1}die.png`;
        dice[1].src = `images/${gameData.roll2}die.png`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // if the game continues
        if (gameData.rollSum === 2) {
            console.log('snake eyes are rolled');
            document.getElementById(`roll-${idx+1}`).innerText = 'Roll';
            showCurrentScore();
            gameInstructions.innerText = `Oh Snap!!`;
            gameInstuctionPlayerName.innerText = 'Snake Eyes!!';
            gameData.score[idx] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            switchActive();
            setTimeout(function() {
                gameInstructions.innerText = `Roll the Dice for`;
                gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
                return;
            }, 2000);
        }else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            console.log('one of the two dice was a 1');
            document.getElementById(`roll-${idx+1}`).innerText = 'Roll';
            gameData.score[idx] -= totalScoreOfRound;
            totalScoreOfRound = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            gameInstructions.innerText = `Sorry, one of your rolls was a one, switching to`;
            gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
            gameData.rollSum = 0;
            showCurrentScore();
            switchActive();
            setTimeout(function() {
                gameInstructions.innerText = `Roll the Dice for`;
                return;
            }, 2000);
        }else {
            console.log('the game proceeeds');
            totalScoreOfRound += gameData.rollSum;
            document.getElementById(`roll-${idx+1}`).innerText = 'Roll Again'
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            document.getElementById(`roll-${idx+1}`).addEventListener('click', function() {
                setUpTurn();
            });
            pass(idx);
            checkWinningCondition();
        }
    }

    function setUpTurn() {
        console.log('!!!!!!!!!!!!run SetUpTurn!!!!!!!!!!!!');
        switchActive();
        gameInstructions.innerText = `Roll the Dice for`;
        gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
        rollButton[0].addEventListener('click', function(){
            round[gameData.index]++;
            roundCounter.innerText = `Round ${round[gameData.index]}`;
            throwDice(gameData.index);
        });
        rollButton[1].addEventListener('click', function(){
            round[gameData.index]++;
            roundCounter.innerText = `Round ${round[gameData.index]}`;
            throwDice(gameData.index);
        });
    }

    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            console.log('winner is here!!!!');
            showCurrentScore();
            gamePlayers[gameData.index].setAttribute('class', 'players');
            gameInstructions.innerText = 'The Winner is';
            gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
            document.querySelector(`#player-${gameData.index+1} .circle-progress`).style.strokeDashoffset = 0;
            quitgameButton.innerText = "Start a New Game?";
            quitgameButton.style.backgroundColor = '#8BAF75';
        } else {
            showCurrentScore()
        }
    }

    function showCurrentScore() {
        console.log(document.querySelector(`#player-${gameData.index+1} .circle-progress`));
        console.log(gameData.score[gameData.index]);
        if(gameData.roll1 !== 1 || gameData.roll2 !== 1) {
            document.querySelector(`#player-1 .score-text`).innerText = `${gameData.score[0]}/30`;
            document.querySelector(`#player-1 .circle-progress`).style.strokeDashoffset = 70 - ((gameData.score[0] / 30)*70);
            document.querySelector(`#player-2 .score-text`).innerText = `${gameData.score[1]}/30`;
            document.querySelector(`#player-2 .circle-progress`).style.strokeDashoffset = 70 - ((gameData.score[1] / 30)*70);
        }  
    }


    function switchActive() {
        gamePlayers[gameData.index].setAttribute('class', 'players active');
        gameArea.style.backgroundColor = bkgColors[gameData.index];
        gamePlayers[1-gameData.index].setAttribute('class', 'players');
    }


    function pass(idx) {
        document.getElementById(`pass-${idx+1}`).addEventListener('click', function() {
            totalScoreOfRound = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            switchActive();
            return;
        });
    }
}());