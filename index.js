var oneSelected = false;

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

    gridElement = document.getElementById("gridwrapper");
    let tiles = [];
    for(let i = 0; i < 8; i++) {
        let tile1 = document.createElement("div");
        let tile2 = document.createElement("div");
        tile1.style.backgroundColor = "#1AFF1A";
        tile2.style.backgroundColor = "#1AFF1A";
        tile1.setAttribute("id", ""+i+"A");
        tile2.setAttribute("id", ""+i+"A");
        tile1.classList.add("tile");
        tile2.classList.add("tile");
        tile1.innerHTML = i;
        tile2.innerHTML = i;
        tile1.addEventListener('click', function(){
            console.log("clicked");
        });
        tiles.push(tile1);
        tiles.push(tile2);
    }
    console.log(tiles);

    for(let i = 0 ; i < 16; i++) {
        let index = positions[i] - 1;
        gridElement.appendChild(tiles[index]);
        console.log(index);
    }
}