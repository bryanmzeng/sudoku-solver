var numSelected = null;
var tileSelected = null;
var clearSelected = null;

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
    for (let i = 0; i < 2; i++) {
        let clearbutton = document.createElement("div");
        clearbutton.classList.add("cb");
        clearbutton.id = i;
        if (i == 0) {
            clearbutton.innerText = "Erase on";
        } else {
            clearbutton.innerText = "Erase off";
        }
        clearbutton.addEventListener("click", selectClear);
        document.getElementById("clearbtn").appendChild(clearbutton);
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
function selectTile() {
    if (numSelected) {
        this.innerText = numSelected.id;
    }
    if (clearSelected.id == "0") {
        this.innerText = "";
    }
}
function selectClear() {
    if (clearSelected != null) {
        clearSelected.classList.remove("clear-selected");
    }
    clearSelected = this;
    clearSelected.classList.add("clear-selected");
}
function deleteAll() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            document.getElementById(r.toString() + "-" + c.toString()).innerText = "";
        }
    }
}


function findSolution() {
    var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (document.getElementById(r.toString() + "-" + c.toString()).innerText) {
                board[r][c] = parseInt(document.getElementById(r.toString() + "-" + c.toString()).innerText);
            } else {
                continue;
            }
        }
    }

    solve(board);
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            document.getElementById(r.toString() + "-" + c.toString()).innerText = board[r][c];
        }
    }
    
}
function solve(bo) {
    const find = findEmpty(bo);
    if (find[2] == 0) {
        return true;
    }
    const row = find[0];
    const col = find[1];
    for (let i = 1; i < 10; i++) {
        if (validate(bo,i, row, col)) {
            bo[row][col] = i;
            if (solve(bo)) {
                return true;
            }
            bo[row][col] = 0;
        }
    }
    return false;
}
function findEmpty(b) {
    ans = [0,0,0];
    for (let i = 0 ; i < 9; i++) {
        for (let j = 0 ; j < 9; j++) {
            if (b[i][j] == 0) {
                ans[0] = i;
                ans[1] = j;
                ans[2] = 1;
                return ans;
            }
        }
    }
    return ans;
}
function validate(b,num, pos1, pos2) {
    for (let i = 0; i < b[0].length; i++) {
        if (b[pos1][i] == num && pos2 != i) {
            return false;
        }
    }
    for (let i = 0; i < b.length; i++) {
        if (b[i][pos2] == num && pos1 != i) {
            return false;
        }
    }
    x = Math.floor(pos2 / 3);
    y = Math.floor(pos1 / 3);

    for (let i = y * 3; i < y * 3 + 3; i++) {
        for (let j = x * 3; j < x * 3 + 3; j++) {
            if (b[i][j] == num && i != pos1 && j != pos2) {
                return false;
            }
        }
    }
    return true;
}