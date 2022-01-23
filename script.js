let xTurn = true;
let gameFinished = false;
const btn = document.querySelector("button");
const cells = document.querySelectorAll(".cell");
const h1 = document.querySelector("#status");
let cellsMarked = 0;

//#region functions
function occupyCell(event){
    if(!isCellOccupied(event.target) && !gameFinished){
        cellsMarked++;
        let value = (xTurn) ? "x" : "o";
        event.target.appendChild(document.createTextNode(value));
        gameOver();
        xTurn = !xTurn;
    }
}

function isCellOccupied(currentCell){
    return (currentCell.childNodes.length !=0) ? true : false;
}

function reset(){
    for (cell of cells){
        if(cell.firstChild)
            cell.removeChild(cell.firstChild);
    }
    cellsMarked = 0;
    h1.innerText = "";    
    gameFinished = false;
    xTurn = true;
}

function gameOver() {
    if(threeInLine()){
        h1.innerText =  xTurn ? "X WON" : "O WON";
        gameFinished = true;
    }
    if(cellsMarked === 9 && h1.innerText === ""){
        h1.innerText = "NO WINNER";
        gameFinished = true; 
    }
}

function threeInLine(){
    let count = 0;
    //checks vertically
    for (let i = 0; i < 3; i++) {
        if(cells[i].firstChild != null){
            count = 1;
            let value = cells[i].innerText;
            for (let j = i+3; j < i+7; j+=3) {
                //debugger;
                if(cells[j].firstChild!=null)
                    if(cells[j].innerText === value)
                        count++;            
                if(count===3)
                    return true;
            }
        }
    }
    //checks Horizontally
    for (let i = 0; i < 7; i+=3) {
        if(cells[i].firstChild != null){
            count = 1;
            let value = cells[i].innerText;
            for (let j = i+1; j < i+3; j++) {
                if(cells[j].firstChild!=null)
                    if(cells[j].innerText === value)
                        count++;            
                if(count===3)
                    return true;
            }
        }
    }
    //checks diagonally
    //to right
    if(cells[0].firstChild != null){
        count = 1;
        let value = cells[0].innerText;
        for (let j = 4; j < 9; j+=4) {
            if(cells[j].firstChild!=null)
                if(cells[j].innerText === value)
                    count++;            
            if(count===3)
                return true;
        }
    } 
    //to left
    if(cells[2].firstChild != null){
        count = 1;
        let value = cells[2].innerText;
        for (let j = 4; j < 7; j+=2) {
            if(cells[j].firstChild!=null)
                if(cells[j].innerText === value)
                    count++;            
            if(count===3)
                return true;
        }
    } 
    return false;
}
//#endregion 

//#region EventListeners
for (cell of cells){
    cell.addEventListener("click",occupyCell);
}

btn.addEventListener("click",reset);
//#endregion

