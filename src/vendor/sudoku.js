/**  giving up is a virtue.
 *
 * @param board [
 * [],
 * [],
 * [],
 * [],
 * [],
 * [],
 * [],
 * [],
 * [],
 * []
 * ]
 * looks like
 * [
 *   1 2 3 4 5 6 7 8 9
 *   4 5 6 7 8 9 1 2 3
 *   7 8 9 1 2 3 4 5 6
 *   2 3 1 5 6 4 8 9 7
 *   5 6 4 8 9 7 2 3 1
 *   8 9 7 2 3 1 5 6 4
 *   3 1 2 6 4 5 9 7 8
 *   6 4 5 9 7 8 3 1 2
 *   9 7 8 3 1 2 6 4 5
 * ]
 */
function sudoku(board) {
    let obj = {}, back = false;
    let columns = [], boxes = [], rows = [];
    columns.length = boxes.length = rows.length = 9;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            console.log(i, j, board[i], obj);
            if (board[i][j] !== '.') {
                if (obj[i + '-' + j]) {
                    if (board[i][j] < 9)
                        board[i][j]++;
                    else {
                        board[i][j] = '.';
                        if (j > 1) {
                            j = j - 2;
                        } else {
                            i--;
                            j = j + 7;
                        }
                        continue;
                    }
                } else {
                    back && j--;
                }
            } else {
                board[i][j] = 1;
                obj[i + '-' + j] = 1;
            }

            if (rows[i]) {
                if (rows[i][board[i][j].toString()]) {
                    if (j > 0) {
                        j--;
                    }
                } else if (board[i][j] !== '.') {
                    rows[i][board[i][j].toString()] = 1;
                }
            } else {
                rows[i] = {};
                if (board[i][j] !== '.')
                    rows[i][board[i][j].toString()] = 1;
            }
        }
    }
    console.log(board);
}

sudoku([['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']]);