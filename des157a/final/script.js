(function() {
    'use strict';
    console.log('reading js'); 

    const main = document.querySelector('main');

    const theRoot = document.querySelector(':root');
    let playersColor = [];
    for (let i = 1; i<=4; i++) {
        playersColor[i] = getComputedStyle(theRoot).getPropertyValue(`--player-${i}-color`);
    }
    console.log(playersColor);
    
    const gameIntro = document.querySelector('#game-intro');
    const choosenumOfPs = document.querySelector('#choose-number-of-players');
    const numOfPsBtn = document.querySelector('#number-of-players');
    const chooseTruckIcons = document.querySelectorAll('#choose-truck img');
    const confirmPlayers = document.querySelector('#players-amount-confirm');
    const overlayBackground = document.querySelector('#overlay-background');
    const startGameBtn = document.querySelector('#startgame-button');
    const trucks = document.querySelectorAll('.truck');
    const lines = document.querySelectorAll('.lines');


    const audioStart = document.querySelector('#audio-start');
    const audioSpin = document.querySelector('#audio-spin');
    const audioOthers = document.querySelector('#audio-others');
    const audioGamerule = document.querySelector('#audio-gamerule');
    const audioFill = document.querySelector('#audio-fill');
    const audio10 = document.querySelector('#audio-10');
    const audioPass = document.querySelector('#audio-pass');
    const audioRestart = document.querySelector('#audio-restart');
    const audioUT = document.querySelector('#audio-ut');
    const audioError = document.querySelector('#audio-error');
    const allAudios = document.querySelectorAll('audio');

    const game = document.querySelector("#the-game");
    const quitGame = document.querySelector('#quitgame-button');
    const restart = document.querySelector('#restart-game');
    const mute = document.querySelector('#mute-button');
    const btnPass = document.querySelector('#btn-pass');
    const btnSpin = document.querySelector('#btn-spin');
    const btn10 = document.querySelector('#btn-10');
    const btnFill = document.querySelector('#btn-fill');
    const currentPlayerName = document.querySelector('#current-player-name');
    const theSpinningNumbers = document.querySelectorAll('.the-numbers');
    const theInstruction = document.querySelector('#instruction-fill-gas-for');
    const gameControlBtn = document.querySelectorAll('#game-control button');

    const deliveryUpadates = ['The shipping label was created','Your package was picked up', 'Your package is in transit','Your package is out for delivery', 'You package was delivered'];

    let numOfPs;
    let playersArr =[0,];
    let startingPlayer = 0;
    let currentPlayer = 0;
    let spinCnt = 0;


    function PlayersData(color) {
        this.score = 0;
        this.spin1 = 0;
        this.spin2 = 0;
        this.spin3 = 0;
        this.spinSum = 0;
        this.color = color;
    }

    // User Test
    document.querySelector('#confirmed-user-test').addEventListener('click',function(){
        audioUT.play();
        document.querySelector('#user-test').style.display = 'none';
    });

    document.querySelector('#user-test-button').addEventListener('click',function(){
        audioUT.play();
        document.querySelector('#user-test').style.display = '';
    });


    // Game rules
    document.querySelector('#confirmed-gamerules').addEventListener('click',function(){
        audioGamerule.play();
        document.querySelector('#gamerules').style.display = 'none';
    });

    document.querySelector('#gamerules-button').addEventListener('click',function(){
        audioGamerule.play();
        document.querySelector('#gamerules').style.display = 'block';
    });
    

    //Intro Area
    chooseTruckIcons.forEach(function(icon){
        icon.addEventListener('click', function(e){
            console.log(e);
            numOfPs = e.target.alt;
            chooseTruckIcons.forEach(function(eachIcon) {
                eachIcon.style.border = '';
                eachIcon.style.opacity = 0.2;
            });
            audioOthers.play();
            chooseTruckIcons[numOfPs-2].style.border = '2px solid black';
            chooseTruckIcons[numOfPs-2].style.padding = '8px';
            chooseTruckIcons[numOfPs-2].style.borderRadius = '10px';
            chooseTruckIcons[numOfPs-2].style.opacity = 1;
        });
    });

    confirmPlayers.addEventListener('click', function(){
        if (numOfPs) {
            game.setAttribute('class', `numberofplayers-${numOfPs}`);
        } else {
            numOfPs = 2;
        }
        audioStart.play();
        gameIntro.style.display = 'none';
        choosenumOfPs.style.display = 'none';
        game.style.display = 'grid';
        for (let i = 1; i <= numOfPs; i++) {
            playersArr[i] = new PlayersData(playersColor[i]);
        }
        startingPlayer = Math.floor(Math.random() * numOfPs) + 1;
        currentPlayerName.innerText = `Player ${startingPlayer}`;
        currentPlayer = startingPlayer;
        console.log(`startingPlayer: ${startingPlayer}`);
        theRoot.style.setProperty("--current-player-color",playersColor[startingPlayer]);
        
    });

    startGameBtn.addEventListener('click', function(){
        choosenumOfPs.style.display = 'block';
        lines.forEach(function(eachLine) {
            eachLine.style.opacity = 0;
        });
        startGameBtn.style.opacity = 0;
        chooseTruckIcons[0].style.border = '2px solid black';
        chooseTruckIcons[0].style.padding = '8px';
        chooseTruckIcons[0].style.borderRadius = '10px';
        chooseTruckIcons[1].style.opacity = 0.2;
        chooseTruckIcons[2].style.opacity = 0.2;
    });
    


    //Game Area
    quitGame.addEventListener('click', function(){
        location.reload();
    });

    mute.addEventListener('click', function(){
        if (mute.className === 'gamecontrols unmuted') {
            mute.innerHTML = '<img src="images/sound.svg" alt="Sound Icon" width="30px">UMMUTE';
            mute.className = 'gamecontrols muted';
        }else {
            mute.innerHTML = '<img src="images/sound.svg" alt="Sound Icon" width="30px">MUTE';
            mute.className = 'gamecontrols unmuted';
        }
    });

    btn10.addEventListener('click', function() {
        audio10.play();
        updateScores(10);
        swithPlayer();
    });

    btnSpin.addEventListener('click', function(){
        audioSpin.play();
        spinNumbers();
    });

    btnFill.addEventListener('click', function() {
        audioFill.play();
        if (playersArr[currentPlayer].spinSum !== 0) {
            updateScores(playersArr[currentPlayer].spinSum);
            swithPlayer();
        }
    });

    restart.addEventListener('click', function(){
        audioRestart.play();
        playersArr = [];
        for (let i = 1; i <= numOfPs; i++) {
            playersArr[i] = new PlayersData(playersColor[i]);
        }
        startingPlayer = Math.floor(Math.random() * numOfPs) + 1;
        currentPlayerName.innerText = `Player ${startingPlayer}`;
        currentPlayer = startingPlayer;
        theRoot.style.setProperty("--current-player-color",playersColor[startingPlayer]);
        document.querySelectorAll(`.delivery-info`).forEach(function(eachInfo) {
            eachInfo.innerText = deliveryUpadates[0];
        });
        document.querySelectorAll(`.percentage`).forEach(function(eachPerc) {
            eachPerc.innerText = `0%`;
        });

        document.querySelectorAll(`.circle-progress`).forEach(function(eachCircle){
            eachCircle.style.strokeDashoffset = 58;
        })
        document.querySelector("#game-control").style.display = '';
        document.querySelector("#game-area").style.gridTemplateRows = '';
        document.querySelector('#game-instructions').style.flexDirection = '';
        theInstruction.innerText = 'FILL SOME GAS FOR';
        theInstruction.style.lineHeight = '';
    });

    mute.addEventListener('click', function() {
        allAudios.forEach(function(eachAudio) {
            eachAudio.muted ? (eachAudio.muted = false) : (eachAudio.muted = true);
        });
    });




    // All funtions

    function updateScores(sum) {
        playersArr[currentPlayer].score += sum;
    }
    
    function resetPlayerScore(s) {
        if (s === true) {
            playersArr[currentPlayer].score = 0;
        }
        playersArr[currentPlayer].spinSum = 0;
        playersArr[currentPlayer].spin1 = 0;
        playersArr[currentPlayer].spin2 = 0;
        playersArr[currentPlayer].spin3 = 0;
    }

    function hideControlButtonTemp(color) {
        gameControlBtn.forEach(function(eachBtn){
            eachBtn.style.backgroundColor = color;
            eachBtn.style.border = `3px solid ${color}`;
            eachBtn.style.pointerEvents = 'none';
        });
    }

    function resetControlButton() {
        gameControlBtn.forEach(function(eachBtn){
            eachBtn.style.backgroundColor = '';
            eachBtn.style.border = '';
            eachBtn.style.pointerEvents = '';
        });
    }

    function spinNumbers(spinCount) {
        let spin1 = Math.floor(Math.random() * 9);
        let spin2 = Math.floor(Math.random() * 9);
        let spin3 = Math.floor(Math.random() * 9);
        theSpinningNumbers[0].innerText = spin1;
        theSpinningNumbers[1].innerText = spin2;
        theSpinningNumbers[2].innerText = spin3;
        if (spin1 ===1 && spin2 === 1 && spin3 === 1 || spin1 ===1 && spin2 === 1 || spin2 ===1 && spin3 === 1 || spin1 ===1 && spin3 === 1) {
            theInstruction.innerText = 'UH OH~ YOUR PACKAGE WAS LOST';
            theInstruction.style.color = 'black';
            currentPlayerName.style.color = 'black';
            hideControlButtonTemp(playersColor[currentPlayer]);
            resetPlayerScore(true);
            setTimeout(function(){
                swithPlayer();
            }, 2000);
        } else if (spin1 ===1 || spin2 === 1 || spin3 === 1) {
            theInstruction.style.color = 'black';
            currentPlayerName.style.color = 'black';
            theInstruction.innerText = 'SORRY, YOU MISSED THE EXIT';
            hideControlButtonTemp(playersColor[currentPlayer]);
            setTimeout(function(){
                swithPlayer();
            }, 2000);
        } else {
            playersArr[currentPlayer].spin1 = spin1;
            playersArr[currentPlayer].spin2 = spin2;
            playersArr[currentPlayer].spin3 = spin3;
            playersArr[currentPlayer].spinSum = playersArr[currentPlayer].spin1 + playersArr[currentPlayer].spin2 + playersArr[currentPlayer].spin3;
            btnSpin.innerText = 'SPIN AGAIN'
            btnSpin.style.gridRow = '1/2';
            btnFill.style.visibility = 'visible';
        }
    }

    // update progress Switch the players 
    function swithPlayer() {
        let percentage = playersArr[currentPlayer].score / 100;
        console.log(percentage);
        if (percentage < 1) {
            // spinCnt = 0;
            if (percentage !== 0) {
                document.querySelector(`#player-${currentPlayer} #player-${currentPlayer}-delivery-info`).innerText = deliveryUpadates[Math.floor(percentage * 4)+1];
            }
            document.querySelector(`#player-${currentPlayer}-progress .circle-progress`).style.strokeDashoffset = Math.round(58 - ((playersArr[currentPlayer].score / 100) * 58));
            document.querySelector(`#player-${currentPlayer} #player-${currentPlayer}-percentage`).innerText = `${Math.round(percentage * 100)}%`;
            resetPlayerScore();
            if (currentPlayer < numOfPs) {
                currentPlayer++;
            } else {
                currentPlayer = 1;
            }
            btnSpin.value = 'SPIN'
            btnSpin.style.gridRow = '1/3';
            btnFill.style.visibility = 'hidden';
            setTimeout(() => {
                theRoot.style.setProperty("--current-player-color", playersColor[currentPlayer]);
                resetControlButton();
                theInstruction.style.color = '';
                currentPlayerName.style.color = '';
                theInstruction.innerText = 'FILL SOME GAS FOR';
                currentPlayerName.innerText = `Player ${currentPlayer}`;
                theSpinningNumbers.forEach(function(eachNum) {
                    eachNum.innerText = 0;
                });
            }, 500);
            
        } else {
            document.querySelector(`#player-${currentPlayer}-progress .circle-progress`).style.strokeDashoffset = 0;
            document.querySelector(`#player-${currentPlayer} #player-${currentPlayer}-percentage`).innerText = `100%`;
            resetPlayerScore();
            document.querySelector("#game-control").style.display = 'none';
            document.querySelector("#game-area").style.gridTemplateRows = "1fr";
            document.querySelector('#game-instructions').style.flexDirection = 'column-reverse';
            theInstruction.innerText = 'HAS DELIVERED THE PACKAGE!';
            theInstruction.style.lineHeight = '3em';
        }
        
    }


















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