let circlesInside = document.querySelectorAll(".circle-inside");
let circlesNumber = document.querySelectorAll(".circle-number");
let circlesOutside = document.querySelectorAll(".circle-outside");
let circlesContainer = document.getElementById("circlesContainer");
let cirlceText = document.querySelectorAll(".circle-text");
let body = document.getElementById("body");
let endModal = document.getElementById("endModal");
let mobileMenu = document.getElementById("mobileMenu");
let menuContainer = document.getElementById("menuContainer");
let menuTitle = document.getElementById("menuTitle");
let bigWrappers = document.querySelectorAll(".menu-big-wrappers");
let smallWrappers = document.querySelectorAll(".menu-small-wrappers");      // declare variables //
let gameContainer = document.getElementById("gameContainer");
let singleplayerStats = document.getElementById("singleplayerStats");
let multiPlayerStats = document.getElementById("multiPlayerStats");
let timerText = document.getElementById("timerText");
let moveText = document.getElementById("moveText");
let endMovesText = document.getElementById("endMovesText");
let endTitle = document.getElementById("endTitle");
let playerWrappers = document.querySelectorAll(".player-wrapper");
let playerLabels = document.querySelectorAll(".player-label");
let playerNumbers = document.querySelectorAll(".player-number");
let playerTriangles = document.querySelectorAll(".player-triangle");
let CurrentTurn = document.querySelectorAll(".current-turn");
let playerCols = document.querySelectorAll(".player-coll");
let playerStatWrappers = document.querySelectorAll(".player-stat-wrapper");
let playerEndText = document.querySelectorAll(".player-end-txt");
let playerStatText = document.querySelectorAll(".player-stat-txt");
let playerPairs = document.querySelectorAll(".player-pairs");
let singlePlayerWrappers = document.querySelectorAll(".end-stat-wrapper");
let nothing = document.getElementById("nothing");

let isNumbers = true;
let numOfPlayers = 1;
let is4x4 = true;
let timerInterval;
let heightInterval;
let minutes;
let seconds;
let currentPlayer = 1;
let playerScores = [0, 0, 0, 0];
let selectedIndex = "";
let currentStr = "";
let isStage2 = false;
let firstCircle;
let secondCirlce;
let firstCover;
let secondCover;
let firstText;
let secondText;
let singleMoves = 0;
let matches = 0;
let winners = 0;

function setNumbers(){
    resetOptionColors(bigWrappers[1], bigWrappers[0]);
    isNumbers = true;
}
function setIcons(){
    resetOptionColors(bigWrappers[0], bigWrappers[1]);
    isNumbers = false;
}
function set4x4(){
    is4x4 = true;
    resetOptionColors(bigWrappers[3], bigWrappers[2]);
}
function set6x6(){
    is4x4 = false;
    resetOptionColors(bigWrappers[2], bigWrappers[3]);
}

let cardArrays = {
        numbers4x4: ["1", "1.", "2", "2.", "3", "3.", "4",
        "4.", "5", "5.", "6", "6.", "7", "7.", "8", "8."],
        numbers6x6: ["1", "1.", "1..", "1...", "2", "2.", "2..",
        "2...", "3", "3.", "3..", "3...", "4", "4.", "4..", "4...", "5",
        "5.", "5..", "5...", "6", "6.", "6..", "6...", "7", "7.", "7..",
        "7...", "8", "8.", "8..", "8...", "9", "9.", "9..", "9..."],

        icons4x4: ["!", "!.", "£", "£.", "%", "%.", "&",
        "&.", "#", "#.", "@", "@.", "?", "?.", "=", "=."],
        icons6x6: ["!", "!.", "!..", "!...", "£", "£.", "£..",
        "£...", "$", "$.", "$..", "$...", "%", "%.", "%..", "%...", "&",
        "&.", "&..", "&...", "=", "=.", "=..", "=...", "#", "#.", "#..",
        "#...", "@", "@.", "@..", "@...", "?", "?.", "?..", "?..."],
}
function setCardData() { // shuffle card numbers/icons //
    if(is4x4 && isNumbers) {
    for(let i = 0; i < 16; i++) {
        let rdnElement = Math.floor(Math.random() * (cardArrays.numbers4x4.length));
        let selectedIndex = cardArrays.numbers4x4[rdnElement];
        cardArrays.numbers4x4 = cardArrays.numbers4x4.filter((value) => {
            return value !== selectedIndex;
        });
        cirlceText[i].textContent = selectedIndex.replaceAll(".", "");
        console.log(rdnElement);
        console.log("selectedIndex: " + selectedIndex);
        console.log(cardArrays.numbers4x4);
    }
} else if(!is4x4 && isNumbers) {
    for(let i = 0; i < 36; i++) {
        let rdnElement = Math.floor(Math.random() * (cardArrays.numbers6x6.length));
        let selectedIndex = cardArrays.numbers6x6[rdnElement];
        cardArrays.numbers6x6 = cardArrays.numbers6x6.filter((value) => {
            return value !== selectedIndex;
        });
        cirlceText[i].textContent = selectedIndex.replaceAll(".", "");
    }
} else if(is4x4 && !isNumbers) {
    for(let i = 0; i < 16; i++) {
        let rdnElement = Math.floor(Math.random() * (cardArrays.icons4x4.length));
        let selectedIndex = cardArrays.icons4x4[rdnElement];
        cardArrays.icons4x4 = cardArrays.icons4x4.filter((value) => {
            return value !== selectedIndex;
        });
        cirlceText[i].textContent = selectedIndex.replaceAll(".", "");
    }
} else if(!is4x4 && !isNumbers) {
    for(let i = 0; i < 36; i++) {
        let rdnElement = Math.floor(Math.random() * (cardArrays.icons6x6.length));
        let selectedIndex = cardArrays.icons6x6[rdnElement];
        cardArrays.icons6x6 = cardArrays.icons6x6.filter((value) => {
            return value !== selectedIndex;
        });
        cirlceText[i].textContent = selectedIndex.replaceAll(".", "");
    }
}
}

// number of players options menu click //
smallWrappers.forEach((activeWrapper, idx) => {
    activeWrapper.addEventListener("click", () => {
        resetPlayerColors(activeWrapper);
        numOfPlayers = idx + 1;
    });
});

// reset background colors //
function resetOptionColors(inactive, active){
    inactive.classList.remove("active-wrappers");
    inactive.classList.add("disabled-wrappers");
    active.classList.add("active-wrappers");
    active.classList.remove("disabled-wrappers");
}
function resetPlayerColors(wrapper){
    smallWrappers.forEach((background) => {
        background.classList.remove("active-wrappers");
        background.classList.add("disabled-wrappers");
    });
    wrapper.classList.remove("disabled-wrappers");
    wrapper.classList.add("active-wrappers");
}

// change amount of player wrappers //
function displayPlayerAmount(num) {
    playerCols.forEach((coll) => {
        coll.style.display = "none";
    });
    for(let i = 0; i < num; i++) {
        playerCols[i].style.display = "flex";
    }
    if(num === 1) {
        singleplayerStats.style.display = "flex";
        multiPlayerStats.style.display = "none";
    } else if(num === 2) {
        playerCols.forEach((coll) => {
            coll.style.width = "261px";
            coll.style.display = "flex";
        });
        playerCols[2].style.display = "none";
        playerCols[3].style.display = "none";
        multiPlayerStats.style.justifyContent = "center";
    } else if(num === 3) {
        playerCols.forEach((coll) => {
            coll.style.width = "261px";
            coll.style.display = "flex";
        });
        playerCols[3].style.display = "none";
        multiPlayerStats.style.justifyContent = "center";
    } else if(num === 4) {
        multiPlayerStats.style.justifyContent = "space-between";
        playerCols.forEach((coll) => {
            coll.style.width = "100%";
            coll.style.display = "flex";
        });
    } 

    if(num > 1) { // display multiplayer
        singleplayerStats.style.display = "none";
        multiPlayerStats.style.display = "flex";
    }
}

// initialize/change player wrappers //
function changePlayerWrappers(index){
    for(let i = 0; i < 4; i++) {
        playerWrappers[i].style.backgroundColor = "hsl(203, 25%, 90%)";
        playerNumbers[i].style.color = "hsl(205, 30%, 27%)";
        playerLabels[i].style.color = "hsl(203, 28%, 54%)";
        CurrentTurn[i].style.opacity = "0";
        playerTriangles[i].style.opacity = "0";
    }
    playerWrappers[index].style.backgroundColor = "hsl(37, 98%, 54%)";
    playerNumbers[index].style.color = "white";
    playerLabels[index].style.color = "white";
    CurrentTurn[index].style.opacity = "1";
    playerTriangles[index].style.opacity = "1";
}

// reset all data //
function resetGameData() {
    cardArrays.numbers4x4 = ["1", "1.", "2", "2.", "3", "3.", "4",
    "4.", "5", "5.", "6", "6.", "7", "7.", "8", "8."];
    cardArrays.numbers6x6 = ["1", "1.", "1..", "1...", "2", "2.", "2..",
    "2...", "3", "3.", "3..", "3...", "4", "4.", "4..", "4...", "5",
    "5.", "5..", "5...", "6", "6.", "6..", "6...", "7", "7.", "7..",
    "7...", "8", "8.", "8..", "8...", "9", "9.", "9..", "9..."];
    cardArrays.icons4x4 = ["!", "!.", "£", "£.", "%", "%.", "&",
    "&.", "#", "#.", "@", "@.", "?", "?.", "=", "=."];
    cardArrays.icons6x6 = ["!", "!.", "!..", "!...", "£", "£.", "£..",
    "£...", "$", "$.", "$..", "$...", "%", "%.", "%..", "%...", "&",
    "&.", "&..", "&...", "=", "=.", "=..", "=...", "#", "#.", "#..",
    "#...", "@", "@.", "@..", "@...", "?", "?.", "?..", "?..."];
    playerScores = [0, 0, 0, 0];
    playerNumbers.forEach((number, idx) => {
        number.textContent = playerScores[idx];
    });
    circlesOutside.forEach((circle) => {
        circle.style.transform = "scale(1)";
    });
    circlesInside.forEach((circle) => {
        circle.style.backgroundColor = "transparent";
        circle.classList.remove("disabled-circle");
    });
    isStage2 = false;
    matches = 0;
    singleMoves = 0;
    winners = 0;
    endTitle.textContent = "You did it!";
    moveText.textContent = singleMoves;
    timerText.textContent = "0:00";
    currentPlayer = 1;
    changePlayerWrappers(0);
}

function displayMobileMenu() {
    mobileMenu.style.display = "flex";
}

function resumeGame() {
    mobileMenu.style.display = "none";
}

function startTimer() {
    let startTime = new Date().getTime();

    timerInterval = setInterval(() => {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;

        minutes = Math.floor(elapsedTime / (1000 * 60));
        seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        if(seconds < 10) {
            timerText.textContent = `${minutes}:0${seconds}`;
        } else {
            timerText.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}
function resetTimer() {
    clearInterval(timerInterval);
    minutes = 0;
    seconds = 0;
    document.getElementById("endTimeText").textContent = timerText.textContent;
}

// switch to game //
function startGame() {
    menuTitle.style.display = "none";
    menuContainer.style.display = "none";
    gameContainer.style.display = "flex";
    body.style.backgroundColor = "white";

    currentPlayer = 1;
    changePlayerWrappers(0); // initialize player 1
    setCardData(); // randomize numbers/icons

    if(numOfPlayers === 1){ // number of players //
        displayPlayerAmount(1);
        startTimer();
    }
    else if(numOfPlayers === 2){displayPlayerAmount(2);} 
    else if(numOfPlayers === 3){displayPlayerAmount(3);} 
    else if(numOfPlayers === 4){displayPlayerAmount(4);}

    organizeCards();
    heightInterval = setInterval(() => {
        organizeCards();
    }, 500);
}

function organizeCards() {
    if(is4x4){  // 4x4 data below //
        for(let i = 16; i < 36; i++) {
            circlesInside[i].style.display = "none"; // grid size //
        }
        if(window.innerWidth > 640) {
        circlesContainer.style.gap = "16px";
        circlesInside.forEach((circle) => {
            circle.style.width = "120px";
            circle.style.height = "120px";
            circle.style.fontSize = "60px";
        });
        circlesOutside.forEach((circle) => {
            circle.style.width = "120px";
            circle.style.height = "120px";
        });
    } else {
        circlesContainer.style.gap = "12px";
        circlesInside.forEach((circle) => {
            circle.style.width = "70px";
            circle.style.height = "70px";
            circle.style.fontSize = "35px";
        });
        circlesOutside.forEach((circle) => {
            circle.style.width = "70px";
            circle.style.height = "70px";
        });
    }
    } else {    // 6x6 data below //
    if(window.innerWidth > 640) {
        circlesContainer.style.gap = "8px";
        circlesInside.forEach((circle) => {
            circle.style.display = "flex";
            circle.style.width = "88px";
            circle.style.height = "88px";
            circle.style.fontSize = "45px";
        });
        circlesOutside.forEach((circle) => {
            circle.style.width = "88px";
            circle.style.height = "88px";
        });
    } else {
        circlesContainer.style.gap = "5px";
        circlesInside.forEach((circle) => {
            circle.style.display = "flex";
            circle.style.width = "46px";
            circle.style.height = "46px";
            circle.style.fontSize = "30px";
        });
        circlesOutside.forEach((circle) => {
            circle.style.width = "46px";
            circle.style.height = "46px";
        });
    }
    }
    if(window.innerWidth < 641) {
        for(let i = 1; i < 5; i++) {
            playerLabels[i - 1].textContent = "P" + i;
        }
    } else {
        for(let i = 1; i < 5; i++) {
            playerLabels[i - 1].textContent = "Player " + i;
        }
    }
}

// mini reset //
function restartGame() {
    timerText.textContent = "0:00";
    resetTimer();
    resetGameData();
    setCardData();
    startTimer();
    mobileMenu.style.display = "none";
    endModal.style.display = "none";
}

// back to menu //
function newGame(){
    menuTitle.style.display = "block";
    menuContainer.style.display = "flex";
    gameContainer.style.display = "none";
    endModal.style.display = "none";
    body.style.backgroundColor = "hsl(206, 45%, 15%)";
    resetOptionColors(bigWrappers[1], bigWrappers[0]);
    resetOptionColors(bigWrappers[3], bigWrappers[2]);
    resetPlayerColors(smallWrappers[0]);
    displayPlayerAmount(1);
    resetGameData();
    mobileMenu.style.display = "none";
    timerText.textContent = "0:00";
    resetTimer();
    numOfPlayers = 1;
    isNumbers = true;
    is4x4 = true;
    clearInterval(heightInterval);
}

// only allow 2 card picks at a time //
function removePointerEvents() {
    circlesOutside.forEach((circle) => {
        circle.style.pointerEvents = "none";
    });
    setTimeout(() => {
    circlesOutside.forEach((circle) => {
        circle.style.pointerEvents = "auto";
    });  
}, 752);} 

function displayPlayerStats() {
    if(numOfPlayers > 1) {
    checkWinner();
    playerStatWrappers.forEach((wrapper) => {
        wrapper.style.display = "none";
    });
    for(let i = 0; i < numOfPlayers; i++) {
        playerStatWrappers[i].style.display = "flex";
    }
    singlePlayerWrappers.forEach((wrapper) => {
        wrapper.style.display = "none";
    });
} else {
    playerStatWrappers.forEach((wrapper) => {
        wrapper.style.display = "none";
    });
    singlePlayerWrappers.forEach((wrapper) => {
        wrapper.style.display = "flex";
    });
}
}

function checkWinner() {
    for(let i = 0; i < 4; i++) {
        playerPairs[i].textContent = playerScores[i];
        if(playerScores[i] >= playerScores[0] && playerScores[i] >= playerScores[1] && playerScores[i] >= playerScores[2] && playerScores[i] >= playerScores[3]) {
            winners++;
            displayWinner(playerStatWrappers[i], playerEndText[i], playerStatText[i], (i + 1));
        } else {
            displayLoser(playerStatWrappers[i], playerEndText[i], playerStatText[i], (i + 1));
        }
    }
}

function displayWinner(wrapper, endText, statText, num) {
    if(numOfPlayers > 2) {
        endModal.style.paddingTop = "0";
    } else {
        endModal.style.paddingTop = "40px";
    }
    if(winners === 1) {
        endTitle.textContent = "Player " + num + " Wins!";
    } else if(winners > 1) {
        endTitle.textContent = "It's a tie!";
    }
    wrapper.style.backgroundColor = "hsl(206, 45%, 15%)";
    endText.textContent = "Player " + num + " (Winner!)";
    endText.style.color = "white";
    statText.style.color = "white";  
}
function displayLoser(wrapper, endText, statText, num) {
    wrapper.style.backgroundColor = "hsl(203, 25%, 90%)";
    endText.textContent = "Player " + num;
    endText.style.color = "hsl(203, 28%, 54%)";
    statText.style.color = "hsl(205, 30%, 27%)";  
}

// when two circles are matches, do this:
function matchCircles(circle1, circle2) {
    matches++;
    circle1.style.backgroundColor = "hsl(203, 28%, 79%)";
    circle2.style.backgroundColor = "hsl(203, 28%, 79%)";
    circle1.classList.add("disabled-circle");
    circle2.classList.add("disabled-circle");
    endMovesText.textContent = (singleMoves) + " Moves";
    for(let i = 0; i < 4; i++) {
        playerNumbers[i].textContent = playerScores[i];
    }
    if(matches === 8 && is4x4) {
            resetTimer();
            displayPlayerStats();
        endModal.style.display = "flex";
    } else if(matches === 18 && !is4x4){
        resetTimer();
        displayPlayerStats();
        endModal.style.display = "flex";
    }
} // when two circles are NOT matches, do this:
function resetCircles(outside1, outside2, circle1, circle2, text1, text2) {
    outside1.style.transform = "scale(1)";
    outside2.style.transform = "scale(1)";
        circle1.style.backgroundColor = "transparent";
        circle2.style.backgroundColor = "transparent";
        text1.style.color = "transparent";
        text2.style.color = "transparent";
}

// circle/card click //
circlesOutside.forEach((circle, idx) =>{
    circle.addEventListener("click", () =>{
        // click transition //
        circle.style.transform = "scale(0)";
        circlesInside[idx].style.backgroundColor = "hsl(37, 98%, 54%)";
        cirlceText[idx].style.color = "white";

        if(!isStage2) { // first pick
            currentStr = cirlceText[idx].textContent;
            isStage2 = true;
            firstCircle = circlesInside[idx];
            firstCover = circlesOutside[idx];
            firstText = cirlceText[idx];
        } else { // seocnd pick
            removePointerEvents();
            isStage2 = false;
            secondCirlce = circlesInside[idx];
            secondCover = circlesOutside[idx];
            secondText = cirlceText[idx];

            if(cirlceText[idx].textContent === currentStr) { // if correct
                setTimeout(() => {
                    if(numOfPlayers > 1) {
                        playerScores[currentPlayer - 1]++; 
                    } else {
                        singleMoves++;
                        moveText.textContent = singleMoves;
                    }
                    matchCircles(firstCircle, secondCirlce);
                }, 750);
            } else {
                setTimeout(() => { // if wrong
                    resetCircles(firstCover, secondCover, firstCircle, secondCirlce, firstText, secondText);
                    singleMoves++;
                    moveText.textContent = singleMoves;

                    if(currentPlayer === 1 && numOfPlayers > 1) {
                        currentPlayer = 2;
                        changePlayerWrappers(1);
                    } else if(currentPlayer === 2) {
                        if(numOfPlayers > 2){
                        currentPlayer = 3;
                        changePlayerWrappers(2);
                        } else {
                            currentPlayer = 1;
                            changePlayerWrappers(0);
                        }
                    } else if(currentPlayer === 3) {
                        if(numOfPlayers > 3){
                        currentPlayer = 4;
                        changePlayerWrappers(3);
                        } else {
                            currentPlayer = 1;
                            changePlayerWrappers(0);
                        }
                    } else if(currentPlayer === 4) {
                        currentPlayer = 1;
                        changePlayerWrappers(0);
                    }
                }, 750);
            }
        }
    });
});