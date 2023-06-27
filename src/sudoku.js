var numSelected = null;
var tileSelected = null;
var clearSelected = null;
var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

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
        let coords = this.id.split("-");
        board[parseInt(coords[0])][parseInt(coords[1])] = numSelected.id;
    }
    if (clearSelected.id == 0) {
        this.innerText = "";
        let coords = this.id.split("-");
        board[parseInt(coords[0])][parseInt(coords[1])] = 0;
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
    solve();
    for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                document.getElementById(r.toString() + "-" + c.toString()).innerText = board[r][c];
        }
     }
    
}
function solve() {
    find = findEmpty();
    if (find[2] == 0) {
        return true;
    }
    row = find[0];
    col = find[1];
    for (let i = 1; i < 10; i++) {
        if (validate(i, row, col)) {
            board[row][col] = i;
            if (this.solve()) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}
function findEmpty() {
    ans = [0,0,0];
        for (let i = 0 ; i < board.length; i++) {
            for (let j = 0 ; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    ans[0] = i;
                    ans[1] = j;
                    ans[2] = 1;
                    return ans;
                }
            }
        }
        return ans;
}
function validate(num, pos1, pos2) {
    for (let i = 0; i < board[0].length; i++) {
        if (board[pos1][i] == num && pos2 != i) {
            return false;
        }
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i][pos2] == num && pos1 != i) {
            return false;
        }
    }
    x = Math.floor(pos2 / 3);
    y = Math.floor(pos1 / 3);

    for (let i = y * 3; i < y * 3 + 3; i++) {
        for (let j = x * 3; j < x * 3 + 3; j++) {
            if (board[i][j] == num && i != pos1 && j != pos2) {
                return false;
            }
        }
    }
    return true;
}