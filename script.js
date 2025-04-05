let currMoleHole;
let currPlantHole;
let score = 0;
let gameOver = false;

window.onload = function(){
    setGame();
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

    setInterval(setMole, 1000); // mole will appear in every 1 second
    setInterval(setPlant, 2000); // plant will appear in every 2 second
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleHole){
        currMoleHole.innerHTML = ""; // empty string will clear the mole who appeared before
    }

    let mole = document.createElement("img");
    mole.src = "./img/mole-img.jpg";

    let num = getRandomTile();
    if (currMoleHole && currMoleHole.id == num) {
        return;
    }
    currMoleHole = document.getElementById(num);
    currMoleHole.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantHole) {
        currPlantHole.innerHTML = "";
    }

    let plant = document.createElement("img");
    // plant.src = "./img/plant-img.jpg";
    plant.src = "./img/plant1.png"

    let num = getRandomTile();
    if (currPlantHole && currPlantHole.id == num) {
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
        document.getElementById("score").innerText = "Game Over : " + score.toString();
        gameOver = true;
    }
}