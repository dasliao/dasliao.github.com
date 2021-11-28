(function() {
    'use strict';
    console.log('reading js');

    const main = document.querySelector('main');

    const gameIntro = document.querySelector('#game-intro');
    const gameRules = document.querySelector('#gamerules');
    const chooseNumOfPs = document.querySelector('#choose-number-of-players');
    const numOfPsBtn = document.querySelector('#number-of-players');
    const chooseTruckIcons = document.querySelectorAll('#choose-truck img');
    const confirmPlayers = document.querySelector('#players-amount-confirm');
    const overlayBackground = document.querySelector('#overlay-background');
    const startGameBtn = document.querySelector('#startgame-button');


    const game = document.querySelector("#the-game");

    let NumOfPs = 0;


    document.querySelector('#gamerule-button').addEventListener('click', function() {
        gameRules.style.display = 'block';
        overlayBackground.style.display = 'block';
    });

    numOfPsBtn.addEventListener('click', function() {
        chooseNumOfPs.style.display = 'block';
        overlayBackground.style.display = 'block';
    });

    startGameBtn.addEventListener('click', function(){
        if (NumOfPs !== 0 && NumOfPs !== 1) {
            gameIntro.style.display = 'none';
            game.style.display = 'grid';
        } else {
            numOfPsBtn.style.backgroundColor = 'red';
            numOfPsBtn.style.border = '2px solid red';
            startGameBtn.addEventListener('mouseout', function(){
                numOfPsBtn.style.backgroundColor = '';
                numOfPsBtn.style.border = '';
            });
        }
    })

    document.querySelector('#gamerules button').addEventListener('click', function(){
        gameRules.style.display = 'none';
        overlayBackground.style.display = 'none';
    });
    
    chooseTruckIcons.forEach(function(icon){
        icon.addEventListener('click', function(e){
            console.log(e);
            NumOfPs = e.target.alt;
            chooseTruckIcons.forEach(function(eachIcon) {
                eachIcon.style.border = '';
            });
            chooseTruckIcons[NumOfPs-2].style.border = '2px solid black';
            chooseTruckIcons[NumOfPs-2].style.padding = '8px';
            chooseTruckIcons[NumOfPs-2].style.borderRadius = '10px';
        });
    });

    confirmPlayers.addEventListener('click', function(){
        if (NumOfPs !== 0 && NumOfPs !== 1) {
            game.setAttribute('class', `numberofplayers-${NumOfPs}`);
            chooseNumOfPs.style.display = 'none';
            overlayBackground.style.display = 'none';
            document.querySelector('#number-of-players').innerText = `${NumOfPs} Players`;
        } else {
            confirmPlayers.style.backgroundColor = 'red';
            confirmPlayers.style.border = '2px solid red';
            confirmPlayers.innerText = 'Choose the # of Players';
            confirmPlayers.addEventListener('mouseout', function(){
                confirmPlayers.innerText = 'Done';
                confirmPlayers.style.backgroundColor = '';
                confirmPlayers.style.border = '';
            });
        }
        
    });

















    // const main = document.querySelector('main');
    // const startGame = document.getElementById('startgame');
    // const playerInputLabel = document.querySelectorAll('.players label');
    // const game = document.getElementById('game');
    // const gameArea = document.querySelector('#game-area');
    // const gameInstructions = document.querySelector('#instructions');
    // const gameInstuctionPlayerName = document.querySelector('#instruction-player-name');
    // const roundCounter = document.querySelector('#round-counter');
    // const dice = document.getElementsByClassName('dice');
    // const rollButton = document.getElementsByClassName('roll');
    // const gamePlayers = document.querySelectorAll('.players');
    // const gamePlayersName = document.querySelectorAll('.players-name');
    // const quitgameButton = document.getElementById('quitgame-button');
    // let round = [0,0];
    // let bkgColors = ['#7DA4DD','#EAA361'];
    // let totalScoreOfRound = 0;
    // let preScore = 0;

    // console.log(game); 


    // var gameData = {
    //     dice: ['1die.png','2die.png','3die.png','4die.png','5die.png','6die.png'],
    //     players: [],
    //     score: [0,0],
    //     roll1: 0,
    //     roll2: 0,
    //     rollSum: 0,
    //     index: 0,
    //     gameEnd: 29
    // }

    // gameData.index = Math.round(Math.random());
    // console.log(gameData.index);

    // playerInputLabel.forEach(function(label){
    //     label.addEventListener('click', function(){
    //         label.className = 'label-active';
    //     });
    // })

    // startGame.addEventListener('click', function(){
    //     const playerNames = document.querySelectorAll('.input-names');
    //     if (playerNames[0].value === '') {
    //         gameData.players[0] = 'Player 1';
    //     } else {
    //         gameData.players[0] = playerNames[0].value;
    //     }
    //     if (playerNames[1].value === '') {
    //         gameData.players[1] = 'Player 2';
    //     }else {
    //         gameData.players[1] = playerNames[1].value;
    //     }
    //     main.setAttribute('class', 'game-started');
    //     quitgameButton.addEventListener('click', function(){
    //         location.reload();
    //     });
    //     gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
    //     gamePlayersName[0].innerText = gameData.players[0];
    //     gamePlayersName[1].innerText = gameData.players[1];
    //     setUpTurn();
    //     console.log('set up the turn');
    // });

    // function throwDice(idx){
    //     showCurrentScore();
    //     console.log('roll the dice');
    //     gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    //     gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    //     dice[0].src = `images/${gameData.roll1}die.png`;
    //     dice[1].src = `images/${gameData.roll2}die.png`;
    //     gameData.rollSum = gameData.roll1 + gameData.roll2;

    //     // if the game continues
    //     if (gameData.rollSum === 2) {
    //         console.log('snake eyes are rolled');
    //         document.getElementById(`roll-${idx+1}`).innerText = 'Roll';
    //         showCurrentScore();
    //         gameInstructions.innerText = `Oh Snap!!`;
    //         gameInstuctionPlayerName.innerText = 'Snake Eyes!!';
    //         gameData.score[idx] = 0;
    //         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    //         switchActive();
    //         setTimeout(function() {
    //             gameInstructions.innerText = `Roll the Dice for`;
    //             gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
    //             return;
    //         }, 2000);
    //     }else if(gameData.roll1 === 1 || gameData.roll2 === 1){
    //         console.log('one of the two dice was a 1');
    //         document.getElementById(`roll-${idx+1}`).innerText = 'Roll';
    //         gameData.score[idx] -= totalScoreOfRound;
    //         totalScoreOfRound = 0;
    //         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    //         gameInstructions.innerText = `Sorry, one of your rolls was a one, switching to`;
    //         gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
    //         gameData.rollSum = 0;
    //         showCurrentScore();
    //         switchActive();
    //         setTimeout(function() {
    //             gameInstructions.innerText = `Roll the Dice for`;
    //             return;
    //         }, 2000);
    //     }else {
    //         console.log('the game proceeeds');
    //         totalScoreOfRound += gameData.rollSum;
    //         document.getElementById(`roll-${idx+1}`).innerText = 'Roll Again'
    //         gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
    //         document.getElementById(`roll-${idx+1}`).addEventListener('click', function() {
    //             setUpTurn();
    //         });
    //         pass(idx);
    //         checkWinningCondition();
    //     }
    // }

    // function setUpTurn() {
    //     console.log('!!!!!!!!!!!!run SetUpTurn!!!!!!!!!!!!');
    //     switchActive();
    //     gameInstructions.innerText = `Roll the Dice for`;
    //     gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
    //     rollButton[0].addEventListener('click', function(){
    //         round[gameData.index]++;
    //         roundCounter.innerText = `Round ${round[gameData.index]}`;
    //         throwDice(gameData.index);
    //     });
    //     rollButton[1].addEventListener('click', function(){
    //         round[gameData.index]++;
    //         roundCounter.innerText = `Round ${round[gameData.index]}`;
    //         throwDice(gameData.index);
    //     });
    // }

    // function checkWinningCondition() {
    //     if(gameData.score[gameData.index] > gameData.gameEnd) {
    //         console.log('winner is here!!!!');
    //         showCurrentScore();
    //         gamePlayers[gameData.index].setAttribute('class', 'players');
    //         gameInstructions.innerText = 'The Winner is';
    //         gameInstuctionPlayerName.innerText = gameData.players[gameData.index];
    //         document.querySelector(`#player-${gameData.index+1} .circle-progress`).style.strokeDashoffset = 0;
    //         quitgameButton.innerText = "Start a New Game?";
    //         quitgameButton.style.backgroundColor = '#8BAF75';
    //     } else {
    //         showCurrentScore()
    //     }
    // }

    // function showCurrentScore() {
    //     console.log(document.querySelector(`#player-${gameData.index+1} .circle-progress`));
    //     console.log(gameData.score[gameData.index]);
    //     if(gameData.roll1 !== 1 || gameData.roll2 !== 1) {
    //         document.querySelector(`#player-1 .score-text`).innerText = `${gameData.score[0]}/30`;
    //         document.querySelector(`#player-1 .circle-progress`).style.strokeDashoffset = 70 - ((gameData.score[0] / 30)*70);
    //         document.querySelector(`#player-2 .score-text`).innerText = `${gameData.score[1]}/30`;
    //         document.querySelector(`#player-2 .circle-progress`).style.strokeDashoffset = 70 - ((gameData.score[1] / 30)*70);
    //     }  
    // }


    // function switchActive() {
    //     gamePlayers[gameData.index].setAttribute('class', 'players active');
    //     gameArea.style.backgroundColor = bkgColors[gameData.index];
    //     gamePlayers[1-gameData.index].setAttribute('class', 'players');
    // }


    // function pass(idx) {
    //     document.getElementById(`pass-${idx+1}`).addEventListener('click', function() {
    //         totalScoreOfRound = 0;
    //         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    //         switchActive();
    //         return;
    //     });
    // }
}());