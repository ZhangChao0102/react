function dynamic(array) {
    if (array.length === 1) {
        return 1;
    }

    return Math.max(dynamic(array.slice(1)) + (array[0] < array[1] ? 1 : 0),
        dynamic(array.slice(0, array.length - 1)) + (array[array.length - 2] < array[array.length - 1] ? 1 : 0));
}

// console.log(dynamic([1, 3, 2, 4, 5, 2, 8, 1]));

function packageSolution(weight, array) {
    console.log(weight, array);
    if (weight <= 0) {
        return 0;
    }

    if (array.length === 1) {
        return weight >= array[0].weight ? array[0].value : 0;
    }

    return Math.max(...array.map((item, index) => {
        let restWeight = weight - item.weight;
        let restArray = array.slice();
        restArray.splice(index, 1);
        return packageSolution(restWeight, restArray) + item.value;
    }));
}

function waterFall(currentArray, newItemsArray) {
    let cache = {};

    return (function loop(array, newItems) {
        let key = array[0] + '&' + array[1] + '&' + array[2];
        if (newItems.length === 0) {
            return array;
        }
        if (cache[key]) {
            return cache[key];
        } else {
            cache[key] = lessDifference(loop([array[0] + newItems[0], array[1], array[2]], newItems.slice(1)),
                loop([array[0], array[1] + newItems[0], array[2]], newItems.slice(1)),
                loop([array[0], array[1], array[2] + newItems[0]], newItems.slice(1)));
        }

        return cache[key];
    })(currentArray, newItemsArray);
}

// console.log(waterFall([1, 2, 3], [6, 4, 5, 9, 1, 2]));

function lessDifference(...arrays) {
    let sum = arrays[0].reduce((total, item) => {
        return total + item;
    });

    arrays.sort(function (arrayA, arrayB) {
        return arrayA.map((item) => {
            return Math.pow(item - sum / arrayA.length, 2);
        }).reduce((total, item) => {
            return total + item;
        }) - arrayB.map((item) => {
            return Math.pow(item - sum / arrayB.length, 2);
        }).reduce((total, item) => {
            return total + item;
        });
    });

    return arrays[0];
}

// console.log(packageSolution(4, [{weight: 2, value: 4}, {weight: 3, value: 6}]));

function longestHuiwen(string) {
    let longest = '';
    if (string.length <= 1) {
        longest = string;
    } else if (string.length === 2) {
        longest = string[0] === string[1] ? string : string[0];
    } else {
        string.split('').forEach((item, index) => {
            if (index < string.length - 2) {
                longest = loop(index + 1, index + 2);
            }
            longest = loop(index + 1, index + 1);
        });
    }

    function loop(index, lastIndex) {
        let newString = string.slice(index, lastIndex);
        if (index > 0 && string[index - 1] === string[lastIndex]) {
            return loop(index - 1, lastIndex + 1);
        } else {
            return newString;
        }
    }

    return longest;
}

// console.log(longestHuiwen('abb'));

function jump(array) {
    let index = 0, step = 0;

    if (array.length < 2) {
        return 0;
    }

    return (function biggest(index, step, useLess) {
        if (index + array[index] >= array.length - 1) {
            return ++step;
        }
        let big = useLess + 1;
        for (let i = useLess + 2; i < array[index] + index + 1; i++) {
            if (i + array[i] >= array[big] + big) {
                big = i;
            }
        }
        return biggest(big, ++step, array[index] + index);

    })(index, step, 0);
}

// console.log(jump([2, 0, 1, 1, 4]));

function candy(ratings) {
    let array1 = [], array2 = [];
    array1.length = ratings.length;
    array2.length = ratings.length;

    for (let i = 0; i < ratings.length; i++) {
        array1[i] = 1;
        if (i > 0) {
            if (ratings[i - 1] < ratings[i]) {
                array1[i] = array1[i - 1] + 1;
            }
        }
    }
    for (let i = ratings.length - 1; i >= 0; i--) {
        array2[i] = 1;
        if (i < ratings.length - 1) {
            if (ratings[i] > ratings[i + 1]) {
                array2[i] = array2[i + 1] + 1;
            }
        }
    }
    console.log(array1, array2);

    return array1.map((item, index) => Math.max(array1[index], array2[index])).reduce((sum, item) => sum + item);
}

// console.log(candy([7,6,5,4,3]));
/**
 * leetCode
 * 股票买入时机
 * @param prices
 * @returns {number}
 */
function maxProfit(prices) {
    let profit = 0;

    for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i] < prices[i + 1]) {
            profit = profit + prices[i + 1] - prices[i];
        }
    }

    return profit;
}

// console.log(maxProfit([7,1,5,3,6,4]));

/**
 * leetCode
 * not right!
 * 股票买入时机 最多两笔交易
 * @param prices
 */
function maxProfit2(prices) {
    let profit = [], isBuy = false, index = 0;

    for (let i = 0; i < prices.length; i++) {
        if (isBuy && i === prices.length - 1) {
            isBuy = false;
            profit[index] = profit[index] + prices[i];
            break;
        }
        if (!isBuy && prices[i] < prices[i + 1]) {
            isBuy = true;
            profit.push(0 - prices[i]);
        } else if (isBuy && prices[i] > prices[i + 1]) {
            isBuy = false;
            profit[index] = profit[index] + prices[i];
            index++;
        }
    }
    if (profit.length === 0) {
        return 0;
    }
    return profit.sort((a, b) => b - a).slice(0, 2).reduce((sum, item) => sum + item);
}

// console.log(maxProfit2([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]));

function canCompleteCircuit(gas, cost) {
    let newGas = [...gas, ...gas], newCost = [...cost, ...cost], initialIndex = 0;

    return (function loop(x1) {
        if (x1 >= gas.length) return -1;
        let diff = 0;
        for (let i = x1; i <= x1 + gas.length; i++) {
            diff = diff + newGas[i] - newCost[i];
            if (diff < 0) {
                return loop(i + 1);
            }
        }
        return x1;
    })(initialIndex);
}

// console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));

function isMatch(s, p) {
    for (let i = 0; i < s.length; i++) {

    }
}

function isValidSudoku(board) {
    let verticalArray = [], squareArray = [];
    for (let i = 0; i < board.length; i++) {
        if (isRepeat(board[i])) {
            return false;
        }
        for (let j = 0; j < board[i].length; j++) {
            if (verticalArray[j]) {
                verticalArray[j][i] = board[i][j];
            } else {
                verticalArray[j] = [];
                verticalArray[j][i] = board[i][j];
            }
            if (squareArray[parseInt(i / 3) * 3 + parseInt(j / 3)]) {
                squareArray[parseInt(i / 3) * 3 + parseInt(j / 3)][i % 3 * 3 + j % 3] = board[i][j];
            } else {
                squareArray[parseInt(i / 3) * 3 + parseInt(j / 3)] = [];
                squareArray[parseInt(i / 3) * 3 + parseInt(j / 3)][i % 3 * 3 + j % 3] = board[i][j];
            }

        }
    }

    for (let i = 0; i < verticalArray.length; i++) {
        if (isRepeat(verticalArray[i])) {
            return false;
        }
        if (isRepeat(squareArray[i])) {
            return false;
        }
    }

    return true;
}

function isRepeat(array) {
    let obj = {};

    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]] && array[i] !== '.') {
            return true;
        }

        obj[array[i]] = 1;
    }

    return false;
}

function isValidSudokuSecond(board) {
    let columns = [], boxes = [], rows = [];
    columns.length = boxes.length = rows.length = 9;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (rows[i]) {
                if (rows[i][board[i][j]]) {
                    return false;
                } else if (board[i][j] !== '.') {
                    rows[i][board[i][j]] = 1;
                }
            } else {
                rows[i] = {};
                if (board[i][j] !== '.')
                    rows[i][board[i][j]] = 1;
            }
            if (columns[j]) {
                if (columns[j][board[i][j]] && board[i][j] !== '.') {
                    return false;
                } else if (board[i][j] !== '.') {
                    columns[j][board[i][j]] = 1;
                }
            } else {
                columns[j] = {};
                if (board[i][j] !== '.')
                    columns[j][board[i][j]] = 1;
            }
            if (boxes[parseInt(i / 3) * 3 + parseInt(j / 3)]) {
                if (boxes[parseInt(i / 3) * 3 + parseInt(j / 3)][board[i][j]] && board[i][j] !== '.') {
                    return false;
                } else if (board[i][j] !== '.') {
                    boxes[parseInt(i / 3) * 3 + parseInt(j / 3)][board[i][j]] = 1;
                }
            } else {
                boxes[parseInt(i / 3) * 3 + parseInt(j / 3)] = {};
                if (board[i][j] !== '.')
                    boxes[parseInt(i / 3) * 3 + parseInt(j / 3)][board[i][j]] = 1;
            }
        }
    }

    return true;
}

var reverseStr = function (s, k) {
    let a = s.split(''), result = [];

    while (a.length >= 2 * k) {
        let s1 = a.splice(0, 2 * k);
        result = [...result, ...s1.splice(0, k).reverse(), ...s1];
    }

    if (a.length < k) {
        result = [...result, ...a.reverse()];
    } else {
        result = [...result, ...a.splice(0, k).reverse(), ...a];
    }

    return result.join('');
};

var reverseStr2 = function (s, k) {
    return s.match(new RegExp(`(\\w{${k * 2}})|((\\w){1,${2 * k - 1}}$)`, 'g')).map(item => {
        let str = item.split('');
        return [...str.splice(0, item.length > k ? k : item.length).reverse(), ...str].join('');
    }).join('');
};

/**
 *
 * 你现在是棒球比赛记录员。
 给定一个字符串列表，每个字符串可以是以下四种类型之一：
 1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
 2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
 3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
 4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
 */
var calPoints = function (ops) {

};

/**
 * 在 N * N 的网格上，我们放置一些 1 * 1 * 1  的立方体。
 * 每个值 v = grid[i][j] 表示 v 个正方体叠放在对应单元格 (i, j) 上。
 * 请你返回最终形体的表面积。
 * @param grid
 */
var surfaceArea = function (grid) {
    let area = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            area += grid[i][j] * 6 - (grid[i][j] > 1 ? (grid[i][j] - 1) * 2 : 0);
            if (i > 0) {
                area -= Math.min(grid[i][j], grid[i - 1][j]) * 2;
            }
            if (j > 0) {
                area -= Math.min(grid[i][j], grid[i][j - 1]) * 2;
            }
        }
    }

    return area;
};

function knightProbability(N, K, r, c) {

    if (r > N - 1 || r < 0 || c > N - 1 || c < 0) {
        return 0;
    }
    if (K === 0) {
        return 1;
    }

    return (knightProbability(N, K - 1, r + 1, c + 2) +
        knightProbability(N, K - 1, r + 1, c - 2) +
        knightProbability(N, K - 1, r - 1, c + 2) +
        knightProbability(N, K - 1, r - 1, c - 2) +
        knightProbability(N, K - 1, r + 2, c + 1) +
        knightProbability(N, K - 1, r + 2, c - 1) +
        knightProbability(N, K - 1, r - 2, c + 1) +
        knightProbability(N, K - 1, r - 2, c - 1)) / 8;
}

function knightProbabilityWithCache(N, K, r, c) {
    let obj = {};

    return (function loop(N, K, r, c) {
        if (r > N - 1 || r < 0 || c > N - 1 || c < 0) {
            return 0;
        }
        if (K === 0) {
            return 1;
        }
        if (obj[K + '-' + r + '-' + c]) {
            return obj[K + '-' + r + '-' + c];
        } else {
            obj[K + '-' + r + '-' + c] = (loop(N, K - 1, r + 1, c + 2) +
                loop(N, K - 1, r + 1, c - 2) +
                loop(N, K - 1, r - 1, c + 2) +
                loop(N, K - 1, r - 1, c - 2) +
                loop(N, K - 1, r + 2, c + 1) +
                loop(N, K - 1, r + 2, c - 1) +
                loop(N, K - 1, r - 2, c + 1) +
                loop(N, K - 1, r - 2, c - 1)) / 8;
        }

        return obj[K + '-' + r + '-' + c];
    })(N, K, r, c);
}

/**
 * TreeNode {
  val: 3,
  right:
   TreeNode {
     val: 20,
     right: TreeNode { val: 7, right: null, left: null },
     left: TreeNode { val: 15, right: null, left: null }
     },
  left: TreeNode { val: 9, right: null, left: null }
  }
 * @param root
 */
function zigzagLevelOrder(root) {
    let array = [], left = true;
    array = [...array, [root.val]];
    while (root) {

        left = !left;
    }
}


/**
 * @param {number[]} nums
 * @return {number}
 */
let dominantIndex = function (nums) {
    let max = 0, second = -1;

    for (let i = 1; i < nums.length; i++) {
        if (max === -1) {
            if (nums[i] >= nums[second] * 2) {
                max = i;
            } else if (nums[i] >= nums[second]) {
                second = i;
            }
        } else {
            if (nums[i] >= nums[max] * 2) {
                second = max;
                max = i;
            } else if (nums[i] >= nums[max]) {
                second = i;
                max = -1;
            } else if (nums[i] > nums[max] / 2) {
                second = max;
                max = -1;
            } else if (nums[i] >= nums[second]) {
                second = i;
            }
        }
    }
    return max;
};

// console.log(dominantIndex([0, 0, 3, 2]));

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
    let cache = {}, words = ['A', 'C', 'G', 'T'], step = 0;

    return (function loop(start, initStep) {
        console.log(start, end, initStep);
        if (cache[start]) {
            return cache[start];
        } else if (start === end) {
            return initStep;
        } else if (initStep > bank.length) {
            return -1;
        } else {
            let array = start.split(''), allChangeArray = [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < words.length; j++) {
                    let newArray = array.slice();
                    newArray[i] = words[j];
                    if (bank.find(item => item === newArray.join('') && !allChangeArray.find(item => item === newArray.join('')))) {
                        allChangeArray.push(newArray.join(''));
                    }
                }
            }
            let step = Math.min.apply(null, allChangeArray.map(item => loop(item, initStep + 1)).filter(item => item !== -1));
            cache[start] = step === Infinity ? -1 : step;
            return cache[start];
        }
    })(start, step);
};

// console.log(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGATT', 'AACCGATA', 'AAACGATA', 'AAACGGTA']));

/**
 * 1079. 活字印刷
 * @param tiles
 */
var numTilePossibilities = function (tiles) {
    let jihe = {};
    if (tiles.length < 2) {
        return tiles.length;
    }
    for (let i = 0; i < tiles.length; i++) {
        jihe[i] = {};
        for (let j = 0; j < i; j++) {
            let string = '';
            // for(){
            //
            // }
            jihe[i][string] = 1;
        }
    }
};

/**
 * 冒泡排序
 */
let maoPao = function (arr) {
    let newArr = arr.slice();

    for (let i = 0; i < newArr.length; i++) {
        let change = false;
        for (let j = 0; j < newArr.length - i - 1; j++) {
            if (newArr[j] > newArr[j + 1]) {
                let temp = newArr[j];
                newArr[j] = newArr[j + 1];
                newArr[j + 1] = temp;
                change = true;
            }
        }
        if (!change) {
            break;
        }
    }

    return newArr;
};

// console.log(maoPao([3, 4, 3, 2, 6]));

/**
 * 选择排序
 */
let xuanZe = function (arr) {
    let newArr = arr.slice();

    for (let i = 0; i < newArr.length - 1; i++) {
        for (let j = i + 1; j < newArr.length; j++) {
            if (newArr[j] < newArr[i]) {
                let temp = newArr[j];
                newArr[j] = newArr[i];
                newArr[i] = temp;
            }
        }
    }

    return newArr;
};

// console.log(xuanZe([2, 4, 9, 2, 1]));

/**
 * 插入排序
 */
let chaRu = function (arr) {
    let newArr = arr.slice();

    for (let i = 1; i < newArr.length; i++) {
        let temp = newArr[i];

        for (let j = i; j >= 0; j--) {
            if (temp < newArr[j - 1]) {
                newArr[j] = newArr[j - 1];
            } else {
                newArr[j] = temp;
                break;
            }
        }
    }

    return newArr;
};

// console.log(chaRu([0, 5, 9, 3, 4, 1]));

/**
 * 希尔排序
 */
let xiEr = function (arr) {
    let length = 1, newArr = arr.slice();

    while (length < newArr.length) {
        length = length * 2 + 1;
    }

    while (length > 0) {
        for (let i = 0; i < newArr.length - length; i++) {
            let temp = newArr[i];
            if (temp > newArr[i + length]) {
                newArr[i] = newArr[i + length];
                newArr[i + length] = temp;
            }
        }

        length = Math.floor(length / 2);
    }

    return newArr;
};

console.log(xiEr([0, 5, 9, 3, 4, 1, 0, 2]));
