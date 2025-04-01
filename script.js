

window.onload = function(){
    setGame();
}

function setGame() {
    // set up the grid for game board from html div
    for (let i = 0; i < 9; i++ ) {// 0-8 times total = 9 times        
        //<div></div> from html
        let hole = document.createElement("div"); 
        hole.id = i.toString();
        document.getElementById("board").appendChild(hole); // created the hole in every loop
    }
}