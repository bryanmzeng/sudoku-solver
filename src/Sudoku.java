public class Sudoku {
    private int[][] board =  {{7,8,0,4,0,0,1,2,0},
        {6,0,0,0,7,5,0,0,9},
        {0,0,0,6,0,1,0,7,8},
        {0,0,7,0,4,0,2,6,0},
        {0,0,1,0,5,0,9,3,0},
        {9,0,4,0,6,0,0,0,5},
        {0,7,0,3,0,0,0,1,2},
        {1,2,0,0,0,7,4,0,0},
        {0,4,9,2,0,6,0,0,7}};
    public void printBoard() {
        for (int i = 0; i < board.length; i++) {
            String temp = "";
            for (int j = 0; j < board[0].length; j++) {
                temp += (board[i][j] + "  ");
            }
            System.out.println(temp);
        }
    }
    private int[] findEmpty() {
        int[] ans = {0,0,0};
        for (int i = 0 ; i < board.length; i++) {
            for (int j = 0 ; j < board[i].length; j++) {
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
    private boolean validate(int num, int pos1, int pos2) {
        for (int i = 0; i < board[0].length; i++) {
            if (board[pos1][i] == num && pos2 != i) {
                return false;
            }
        }
        for (int i = 0; i < board.length; i++) {
            if (board[i][pos2] == num && pos1 != i) {
                return false;
            }
        }
        int x = pos2 / 3;
        int y = pos1 / 3;

        for (int i = y * 3; i < y * 3 + 3; i++) {
            for (int j = x * 3; j < x * 3 + 3; j++) {
                if (board[i][j] == num && i != pos1 && j != pos2) {
                    return false;
                }
            }
        }
        return true;
    }
    public boolean solve() {
        int[] find = this.findEmpty();
        if (find[2] == 0) {
            return true;
        }
        int row = find[0];
        int col = find[1];
        for (int i = 1; i < 10; i++) {
            if (this.validate(i, row, col)) {
                board[row][col] = i;
                if (this.solve()) {
                    return true;
                }
                board[row][col] = 0;
            }
        }
        return false;
    }
    public static void main(String[] args) {
        Sudoku board = new Sudoku();
        board.printBoard();
        if (board.solve()) {
            System.out.println("---------------------------");
            System.out.println("Board solved successfully");
            System.out.println("---------------------------");
            board.printBoard();
        } else {
            System.out.println("---------------------------");
            System.out.println("Failed to solve");
        }
    }
}
