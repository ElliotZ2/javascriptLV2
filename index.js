var oneSelected = false;
var correctTiles = [];
var selectedTiles = [];
var allTiles = [];
var attempts = 0;
var twoRevealed = false;

function initialize() {
    populateGrid();
}

function populateGrid() {
    let positions = [];
    while(positions.length < 16) {
        let random = Math.floor(Math.random() * 16) + 1;
        if(!positions.includes(random)) {
            positions.push(random);
        }
    }
    console.log(positions);

    gridElement = document.getElementById("grid");
    for(let i = 0; i < 8; i++) {
        let tile1 = document.createElement("div");
        let tile2 = document.createElement("div");
        tile1.setAttribute("id", ""+i+"A");
        tile2.setAttribute("id", ""+i+"B");
        tile1.classList.add("tile");
        tile2.classList.add("tile");
        /*show innerhtml for testing*/
        //tile1.innerHTML = i;
        //tile2.innerHTML = i;
        tile1.addEventListener('click', function(){
            tileClick(tile1);
        });
        tile2.addEventListener('click', function(){
            tileClick(tile2);
        })
        allTiles.push(tile1);
        allTiles.push(tile2);
    }
    console.log(allTiles);

    for(let i = 0 ; i < 16; i++) {
        let index = positions[i] - 1;
        gridElement.appendChild(allTiles[index]);
        console.log(index);
    }
    unrevealTiles();
}

function tileClick(tile) {
    if(correctTiles.includes(tile)) {//ignored correctly guessed tiles
        return;
    }
    if(selectedTiles.includes(tile)) {
        return;
    }
    if(twoRevealed) {
        unrevealTiles();
        twoRevealed=false;
    }
    selectedTiles.push(tile);
    revealTile(tile);
    attempts++;
    updateScore();
    if(oneSelected==true) {
        let numberOne = "" + selectedTiles[0].id;
        let numberTwo = "" + selectedTiles[1].id;
        numberOne=numberOne.charAt(0);
        numberTwo=numberTwo.charAt(0);
        if(numberOne == numberTwo) {//guessed correctly
            console.log("Guessed correctly!");
            correctTiles.push(selectedTiles[0]);
            correctTiles.push(selectedTiles[1]);
            checkForWin();
        }
        else{//guessed incorrectly
            console.log("Guessed incorrectly.");
        }
        selectedTiles=[];
        oneSelected=false;
        twoRevealed=true;
    }
    else{
        oneSelected=true;
    }
}

function checkForWin() {
    if(correctTiles.length >= 16) {
        console.log("YOU WIN");
        document.getElementById("wintext").innerHTML="YOU WIN!";
        let scoreText = document.getElementById("score").innerHTML;
        console.log(document.getElementById("score").innerHTML);
        scoreText+=". ";
        if(attempts==16) {
            scoreText+="cheater"
        }
        else if(attempts<=26) {
            scoreText+="You did an excellent job!";
        }
        else if(attempts<=42) {
            scoreText+="Good job! Keep trying for a better score!";
        }
        else{
            scoreText+="Were you even trying?";
        }
        document.getElementById("score").innerHTML = scoreText;
    }
}

function revealTile(tile) {
    let idNum=tile.id;
    idNum=idNum.charAt(0);
    idNum++;
    tile.style.backgroundImage="url(images/"+idNum+".png)";
    console.log("images/"+idNum+".png");
}

function unrevealTiles() {
    for(let i = 0; i < allTiles.length; i++) {
        if(!correctTiles.includes(allTiles[i])) {
            allTiles[i].style.backgroundImage="url(images/question.jpg)";
        }
    }
}

function updateScore() {
    document.getElementById("score").innerHTML="Score: " + attempts;
}