let currMoleHole;
let currPlantHole;
let moleInterval;
let plantInterval;
let timerInterval;
let score = 0;
let gameOver = false;
let timeLeft = 60; // 60 seconds


window.onload = function(){
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("reset-btn").addEventListener("click", resetGame);    
};

function startGame(){
    resetGame(); // start fresh
    setGame(); // set up the board
    showTime(); // start the timer

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function resetGame(){    
        clearInterval(moleInterval);
        clearInterval(plantInterval);
        clearInterval(timerInterval);
    
        document.getElementById("board").innerHTML = "";
        document.getElementById("score").innerText = "0";
        document.getElementById("timer").innerText = "Time : 60 sec";
    
        score = 0;
        timeLeft = 60;
        gameOver = false;
        currMoleHole = null;
        currPlantHole = null;
    
        const best = localStorage.getItem("bestScore") || 0;
        document.getElementById("best-score").innerText = `Best Score: ${best}`;
}

function setGame() {
    // set up the grid for game board from html div
    for (let i = 0; i < 9; i++ ) {// 0-8 times total = 9 times        
        //<div></div> from html
        let hole = document.createElement("div"); 
        hole.id = i.toString();       
        hole.addEventListener("click", showScore);
        document.getElementById("board").appendChild(hole); // created the hole in every loop
    }    
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        if (currMoleHole) currMoleHole.innerHTML = ""; // remove mole
        return;
    }
    if (currMoleHole){
        currMoleHole.innerHTML = ""; // empty string will clear the mole who appeared before
    }

    let mole = document.createElement("img");
    mole.src = "./img/mole-img1.png";

    let num = getRandomTile();
    if (currPlantHole && currPlantHole.id == num) {
        return;
    }
    currMoleHole = document.getElementById(num);
    currMoleHole.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        if (currPlantHole) currPlantHole.innerHTML = ""; // remove plant
        return;
    }
    if (currPlantHole) {
        currPlantHole.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./img/plant2.png"

    let num = getRandomTile();
    if (currMoleHole && currMoleHole.id == num) {
        return;
    }
    currPlantHole = document.getElementById(num);
    currPlantHole.appendChild(plant);
}

function showScore() {
    if (gameOver) {
        return;
    }
    if (this == currMoleHole) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // update the score
    }else if (this == currPlantHole) {
        gameOver = true;
        document.getElementById("score").innerText = "Game Over : " + score.toString();
        lastBestScore(score);
    }
}

function lastBestScore(currentScore){
    const best = localStorage.getItem("bestScore");
    if (!best || currentScore > parseInt(best)) {
        localStorage.setItem("bestScore", currentScore);
        document.getElementById("best-score").innerText = `Best Score : ${currentScore}`;
    } else {
        document.getElementById("best-score").innerText = `Best Score : ${best}`;
    }
}

function showTime(){
    if (gameOver) return;   

    let timeDisplay = document.getElementById("timer");
    timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timer); // stop time when it hits 0   
            clearInterval(moleInterval); // stop mole
            clearInterval(plantInterval); // stop plant 
            
            if (currMoleHole) currMoleHole.innerHTML = "";
            if (currPlantHole) currPlantHole.innerHTML = "";

            timeDisplay.textContent = "Oops.. Wrong Click... Try Again!";
            lastBestScore(score);
            return;
        }

        if (timeLeft <= 0) {
            clearInterval(timer); // stop time when it hits 0   
            clearInterval(moleInterval); // stop mole
            clearInterval(plantInterval); // stop plant             
            
            if (currMoleHole) currMoleHole.innerHTML = "";
            if (currPlantHole) currPlantHole.innerHTML = "";

            timeDisplay.textContent = `Time's Up!   Your Score is ${score}`;  
            gameOver = true;
            
            lastBestScore(score);
            return;
        } else {
            timeDisplay.textContent = `Time : ${timeLeft} sec`;
            timeLeft--;
        }

    }, 1000);
}