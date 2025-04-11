let currMoleHole;
let currPlantHole;
let moleInterval;
let plantInterval;
let score = 0;
let gameOver = false;
let timeLeft = 10; // 60 seconds

window.onload = function(){
    setGame();
    showTime();
    const best = localStorage.getItem("bestScore") || 0;
    document.getElementById("best-Score").innerText = `Best Score : ${best}`;
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

    moleInterval = setInterval(setMole, 1000); // mole will appear in every 1 second
    plantInterval = setInterval(setPlant, 2000); // plant will appear in every 2 second
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
    mole.src = "./img/mole-img.jpg";

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
    // plant.src = "./img/plant-img.jpg";
    plant.src = "./img/plant1.png"

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
        document.getElementById("best-Score").innerText = `Best Score : ${currentScore}`;
    } else {
        document.getElementById("best-Score").innerText = `Best Score : ${best}`;
    }
}

function showTime(){
    if (gameOver) return;   

    let timeDisplay = document.getElementById("timer");
    let timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer); // stop time when it hits 0   
            clearInterval(moleInterval); // stop mole
            clearInterval(plantInterval); // stop plant 
            
            if (currMoleHole) currMoleHole.innerHTML = "";
            if (currPlantHole) currPlantHole.innerHTML = "";

            timeDisplay.textContent = "Oops.. Wrong Click... Try Again!";

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