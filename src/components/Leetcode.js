/**
 * leetcode
 * 123 not done.
 */

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
 * 123. 买卖股票的最佳时机 III
 * 股票买入时机 最多两笔交易
 * @param prices
 */
function maxProfit2(prices) {
    let min = prices[0], minI = 0, maxI = 0, profit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
            minI = i;
        } else {
            if (profit < prices[i] - min) {
                profit = prices[i] - min;
                maxI = i;
            }
        }
    }

    return profit;
}

console.log(maxProfit2([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]));

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
    let time1 = new Date().getTime();
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
    let time2 = new Date().getTime();
    console.log(time2 - time1);
    return newArr;
};

// console.log(chaRu([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

/**
 * 希尔排序
 */
let xiEr = function (arr) {
    let increSeq = [], n = 1, step = 0, resultArr = arr.slice();

    /*构造增量序列*/
    while (step < arr.length) {
        step = 2 ^ n - 1;
        increSeq.push(step);
        n++;
    }

    for (let i = increSeq.length - 1; i >= 0; i--) {
        let step = increSeq[i];
        for (let j = 0; j < step; j++) {
            let spacingArray = [], multiple = 0;
            while (multiple * step + j < resultArr.length) {
                spacingArray.push(resultArr[multiple * step + j]);
                multiple++;
            }
            let sortedArr = chaRu(spacingArray);
            while (sortedArr.length > 0) {
                multiple--;
                resultArr[multiple * step + j] = sortedArr.pop();
            }
        }
    }

    return resultArr;
};

// console.log(xiEr([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

/**
 * 归并排序
 */
let guiBing = function (arr) {
    let length = 1, newArray = arr.slice();

    while (length < newArray.length) {
        for (let i = 0; i < newArray.length; i += 2 * length) {
            // newArray.splice(i, 2 * length, ...merge(newArray.slice(i, length + i), newArray.slice(length + i, 2 * length + i)));
            merge(newArray, i, 2 * length + i, length);
        }
        length *= 2;
    }

    // function merge(arr1, arr2) {
    //     let newArr = [], j = 0, i = 0;
    //     while (i < arr1.length && j < arr2.length) {
    //         if (arr1[i] < arr2[j]) {
    //             newArr.push(arr1[i]);
    //             i++;
    //         } else {
    //             newArr.push(arr2[j]);
    //             j++;
    //         }
    //     }
    //     newArr = [...newArr, ...arr1.slice(i), ...arr2.slice(j)];
    //
    //     return newArr;
    // }

    function merge(arr, start, end, length) {
        let i = start, j = start + length, k = 0; //如果插入了j，i的最大值也要+1
        while (i < start + length + k && j < end) {
            if (arr[i] < arr[j]) {
                i++;
            } else {
                arr.splice(i, 0, ...arr.splice(j, 1));
                k++;
                i++;
                j++;
            }
        }
        console.log(arr);
    }

    return newArray;
};

// console.log(guiBing([0, 5, 9, 3, 4, 1, 0, 2, 1]));

/**
 * 归并排序
 */
function guiBing2(array) {
    let newArray = array.slice();

    (function apart(arr, start, end) {
        if (end - start > 1) {
            let mid = Math.round((start + end) / 2);
            apart(arr, start, mid);
            apart(arr, mid, end);
            merge(arr, start, end);
        }
    })(newArray, 0, newArray.length);

    function merge(arr, start, end) {
        let mid = Math.round((start + end) / 2);
        let i = start, j = mid, k = 0; //如果插入了j，i的最大值也要+1
        while (i < mid + k && j < end) {
            if (arr[i] < arr[j]) {
                i++;
            } else {
                arr.splice(i, 0, ...arr.splice(j, 1));
                k++;
                i++;
                j++;
            }
        }
    }

    return newArray;
}

// console.log(guiBing2([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

/**
 * 堆排序
 */
function stack(arr) {
    let stackArray = arr.slice(), resultArray = [];
    while (stackArray.length > 0) {
        let last = stackArray.pop();
        stackArray = [last, ...stackArray];
        for (let i = 1; i < stackArray.length; i++) {
            let index = i;
            while (index > 0) {
                let nexIndex = Math.floor((index - 1) / 2);
                if (stackArray[index] > stackArray[nexIndex]) {
                    let temp = stackArray[index];
                    stackArray[index] = stackArray[nexIndex];
                    stackArray[nexIndex] = temp;
                }
                index = nexIndex;
            }
        }
        resultArray = [stackArray.shift(), ...resultArray];
    }
    return resultArray;
}

// console.log(stack([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

function shell(arr) {
    let newArr = arr.slice(), length = Math.floor(newArr.length / 2) + 1;

    while (length > 0) {
        for (let i = 0; i < length; i++) {
            let j = i;
            while (j < newArr.length) {
                let temp = newArr[j];
                if (temp > newArr[j + length]) {
                    newArr[j] = newArr[j + length];
                    newArr[j + length] = temp;
                }
                j += length;
            }
        }
        length = Math.floor(length / 2);
    }

    return newArr;
}

// console.log(shell([1, 8, 7, 6, 5, 1, 2, 3, 0, 0]));

function quick(arr) {
    let standard = arr[1];

    return (function loop(arr, standard) {
        if (arr.length <= 1) {
            return arr;
        }
        let arr1 = [], arr2 = [];
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > standard) {
                arr2.push(arr[i]);
            } else if (arr[i] === standard) {
                if (flag) {
                    arr2.push(arr[i]);
                } else {
                    arr1.push(arr[i]);
                }
                flag = !flag;
            } else {
                arr1.push(arr[i]);
            }
        }
        return [...loop(arr1, arr1[Math.round(Math.random() * arr1.length)]), ...loop(arr2, arr2[Math.round(Math.random() * arr2.length)])];
    })(arr, standard);
}

// console.log(quick([1, 8, 7, 6, 5, 1, 2, 3, 0, 0]));

function count(arr) {
    let arr1 = [], arr2 = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr1[arr[i]]) {
            arr1[arr[i]]++;
        } else {
            arr1[arr[i]] = 1;
        }
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] > 0) {
            arr2.push(i);
            arr1[i]--;
            i--;
        }
    }

    return arr2;
}

// console.log(count([1, 8, 7, 6, 5, 1, 2, 3, 0, 0]));

function bucket(arr, bucketSize = 3) {
    let min = arr[0], max = arr[0], bucketNum;
    let arrs = [], finallyArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    bucketNum = Math.floor((max - min) / bucketSize);
    arrs.length = bucketNum;
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor((arr[i] - min) / bucketSize);
        if (arrs[index]) {
            arrs[index].push(arr[i]);
        } else {
            arrs[index] = [arr[i]];
        }
    }
    for (let i = 0; i < arrs.length; i++) {
        finallyArr = [...finallyArr, ...count(arrs[i])];
    }
    return finallyArr;
}

// console.log(bucket([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

function radix(arr) {
    let radixArr = [], index = 0, flag = true, resultArr = [];
    radixArr.length = 10;

    while (flag) {
        flag = false;
        for (let i = 0; i < arr.length; i++) {
            let length = arr[i].toString().length, arrIndex = 0;
            if (length - index > 0) {
                flag = true;
                arrIndex = arr[i].toString()[index];
            }
            if (radixArr[arrIndex]) {
                radixArr[arrIndex].push(arr[i]);
            } else {
                radixArr[arrIndex] = [arr[i]];
            }
        }
        if (flag) {
            resultArr = [];
            for (let i = 0; i < radixArr.length; i++) {
                resultArr = [...resultArr, ...radixArr[i]];
            }
        }

        radixArr = [];
        index++;
    }

    return resultArr;
}

// console.log(radix([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

/**
 * leetcode 41: 缺失的第一个正数
 */
function firstLostPositiveNumber(arr) {
    let indexArr = [], index = 1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            indexArr[arr[i] - 1] = 1;
        }
    }

    for (let i = 0; i < indexArr.length; i++) {
        if (!indexArr[i]) {
            index = i + 1;
            break;
        }
        if (i === indexArr.length - 1) {
            index = indexArr.length + 1;
        }
    }

    return index;
}

/**
 * leetcode 22: 括号生成 too complex
 */
function bracketGenerate(num) {
    let resultArr = [], tree = [null], index = 0, largest = 0, lest = 0;

    // while (index <= num) {
    //     index++;
    //     for (let i = 0; i < index; i++) {
    //         tree = [...tree, '(', ')'];
    //     }
    // }

    while (index < 2 * num) {
        largest = largest * 2 + 2;
        lest = lest * 2 + 1;
        for (let i = 0; i < Math.pow(2, index); i++) {
            tree = [...tree, '(', ')'];
        }
        index++;
    }
    while (lest <= largest) {
        let temp = '', left = 0, right = 0;
        for (let i = lest; i > 0; i = Math.floor((i - 1) / 2)) {
            temp = tree[i] + temp;
            if (tree[i] === '(') {
                left++;
            } else {
                right++;
            }
            if (left > right || left > num || right > num || i === 2) {
                temp = '';
                break;
            }
            if (i === 1) {
                resultArr.push(temp);
                temp = '';
            }
        }
        lest++;
    }

    return resultArr;
}

// console.log(bracketGenerate(8));

/**
 * leetcode 22: 括号生成
 */
function bracketGenerate2(num) {
    let resultArr = [];

    set([], 0, 0);

    function set(arr, left, right) {
        if (right > left) {
            return;
        }
        if (left < num) {
            set([...arr, '('], left + 1, right);
        }
        if (right < num) {
            set([...arr, ')'], left, right + 1);
        }
        if (left === num && right === num) {
            resultArr.push(arr.join(''));
        }
    }

    return resultArr;
}

// console.log(bracketGenerate2(3));

/**
 * leetcode 22: 括号生成
 */
function bracketGenerate3(num) {
    let resultArray = [['']];

    for (let i = 1; i <= num; i++) {
        resultArray[i] = [];
        for (let l = 0; l < resultArray[i - 1].length; l++) {
            let string = resultArray[i - 1][l];
            console.log('l=' + l);
            for (let j = 0; j <= string.length; j++) {
                console.log('j=' + j);
                for (let k = j + 1; k <= string.length + 1; k++) {
                    console.log('k=' + k);
                    let newString = string.split('');
                    newString.splice(j, 0, '(');
                    newString.splice(k, 0, ')');
                    resultArray[i].push(newString.join(''));
                }
            }
        }
    }

    return [...new Set(resultArray[num])];
}

// console.log(bracketGenerate3(2));

/**
 * leetcode 30 串联所有单词的子串
 * @param s
 * @param words
 */
var findSubstring = function (s, words) {
    if (words.length === 0 || s.length === 0) {
        return [];
    }
    let resultArr = [], wordLength = words[0].length, allLength = words.length * wordLength;

    for (let i = 0; i < s.length - allLength + 1; i++) {
        let temp = s.substr(i, allLength).split(''), flag = true, copyWord = words.slice();

        while (temp.length > 0) {
            let word = temp.splice(0, wordLength).join('');
            let index = copyWord.indexOf(word);
            if (index === -1) {
                flag = false;
                temp = '';
            } else {
                copyWord.splice(index, 1);
            }
        }
        flag && resultArr.push(i);
    }

    return resultArr;
};

// console.log(findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "good"]))

/**
 * leetcode 229 求众数
 * @param nums
 */
var majorityElement = function (nums) {
    let obj = {};

    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]] || obj[nums[i]] === 0) {
            obj[nums[i]]++;
        } else {
            obj[nums[i]] = -Math.floor(nums.length / 3);
        }
    }

    return Object.keys(obj).filter(key => obj[key] >= 0).map(item => parseInt(item));
};

// console.log(majorityElement([0, 0, 0]));

/**
 * 摩尔投票
 * @param nums
 */
var majorityElement2 = function (nums) {
    let cache1, cache2, cache3;

    for (let i = 0; i < nums.length; i++) {

    }
};

/**
 * leetcode 37 解数独
 * @param board
 */
var solveSudoku = function (board) {
    let usedNumsObj = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
    };
    let resultBoard = board.slice();
    let emptyArray = [];

    //构造空值的位子集合
    for (let i = 0; i < resultBoard.length; i++) {
        for (let j = 0; j < resultBoard[i].length; j++) {
            if (resultBoard[i][j] === '.') {
                emptyArray.push([i, j]);
            } else {
                usedNumsObj[resultBoard[i][j]]++;
            }
        }
    }

    function loop(board, index, num) {
        let [i, j] = emptyArray[index];
        board[i][j] = num;
        usedNumsObj[num]++;

        let arrI = board[i], arrJ = [], arrGird = [], girdI = Math.floor(i / 3) * 3, girdJ = Math.floor(j / 3) * 3;
        //构造第j列的数组
        for (let index = 0; index < board.length; index++) {
            arrJ.push(board[index][j]);
        }
        //构造i，j所在的方块数组
        for (let index2 = girdI; index2 < girdI + 3; index2++) {
            for (let index3 = girdJ; index3 < girdJ + 3; index3++) {
                arrGird.push(board[index2][index3]);
            }
        }
        //不符合则直接还原
        if (!validGridTrue(arrI) || !validGridTrue(arrJ) || !validGridTrue(arrGird)) {
            board[i][j] = '.';
            usedNumsObj[num]--;
            return false;
        }

        if (index === emptyArray.length - 1) {
            return true;
        }

        for (let key in usedNumsObj) {
            if (usedNumsObj[key] === 9) {
                continue;
            }
            if (loop(board, index + 1, key)) {
                return true;
            }
        }

        board[i][j] = '.';
        usedNumsObj[num]--;
        return false;
    };

    //验证数组中是否没有重复
    function validGridTrue(arr) {
        let cacheArr = {};
        for (let k1 = 0; k1 < arr.length; k1++) {
            let key = arr[k1];
            if (key === '.') {
                continue;
            }
            if (!cacheArr[key]) {
                cacheArr[key] = 1;
            } else {
                return false;
            }
        }
        return true;
    }

    for (let key in usedNumsObj) {
        if (usedNumsObj[key] === 9) {
            continue;
        }
        if (loop(resultBoard, 0, key)) {
            break;
        }
    }

    return resultBoard;
};

// console.log(solveSudoku(
//     [
//         [".", ".", ".", ".", ".", "7", ".", ".", "9"],
//         [".", "4", ".", ".", "8", "1", "2", ".", "."],
//         [".", ".", ".", "9", ".", ".", ".", "1", "."],
//         [".", ".", "5", "3", ".", ".", ".", "7", "2"],
//         ["2", "9", "3", ".", ".", ".", ".", "5", "."],
//         [".", ".", ".", ".", ".", "5", "3", ".", "."],
//         ["8", ".", ".", ".", "2", "3", ".", ".", "."],
//         ["7", ".", ".", ".", "5", ".", ".", "4", "."],
//         ["5", "3", "1", ".", "7", ".", ".", ".", "."]
//     ]));

// console.log(solveSudoku(
//     [
//         [".", ".", ".", ".", ".", "7", ".", ".", "9"],
//         [".", "4", ".", ".", "8", "1", "2", ".", "."],
//         [".", ".", ".", "9", ".", ".", ".", "1", "."],
//         [".", ".", "5", "3", ".", ".", ".", "7", "2"],
//         ["2", "9", "3", ".", ".", ".", ".", "5", "."],
//         [".", ".", ".", ".", ".", "5", "3", ".", "."],
//         ["8", ".", ".", ".", "2", "3", ".", ".", "."],
//         ["7", ".", ".", ".", "5", ".", ".", "4", "."],
//         ["5", "3", "1", ".", "7", ".", ".", ".", "."]
//     ]));

/**
 * leetcode 62 不同路径
 * @param m
 * @param n
 */
var uniquePaths = function (m, n) {
    let cache = {};
    return (function loop(m, n) {
        if (m === 1) {
            return 1;
        }
        if (n === 1) {
            return 1;
        }
        if (!cache[m + ',' + n]) {
            cache[m + ',' + n] = loop(m - 1, n) + loop(m, n - 1);
        }

        return cache[m + ',' + n];
    })(m, n);
};

// console.log(uniquePaths(7, 3))

/**
 * leetcode 63 不同路径2
 * @param m
 * @param n
 */
var uniquePaths2 = function (array) {
    let cache = {}, cache2 = {};
    return (function loop(m, n) {
        if (array[m][n] === 1) {
            // if (cache2[m])
            //     cache2[m] = Math.min(n, cache2[m]);
            // else
            //     cache2[m] = n;
            return 0;
        }
        if (m === 0 && n === 0) {
            return 1;
        }
        if (!cache[m + ',' + n]) {
            cache[m + ',' + n] = (m > 0 ? loop(m - 1, n) : 0) + (n > 0 ? loop(m, n - 1) : 0);
        }

        return cache[m + ',' + n];
    })(array.length - 1, array[array.length - 1].length - 1);
};

// console.log(uniquePaths2([1, 0]));

/**
 * leetcode 64 最小路径和
 * @param grid
 */
var minPathSum = function (grid) {
    let maxI = grid.length - 1, maxJ = grid[maxI].length - 1, cache = {};

    return (function loop(x, y) {
        if (x === 0 && y === 0) {
            return grid[0][0];
        }

        if (!cache[x + ',' + y]) {
            if (x === 0) {
                cache[x + ',' + y] = loop(x, y - 1) + grid[x][y];
            } else if (y === 0) {
                cache[x + ',' + y] = loop(x - 1, y) + grid[x][y];
            } else {
                cache[x + ',' + y] = Math.min(loop(x - 1, y), loop(x, y - 1)) + grid[x][y];
            }
        }

        return cache[x + ',' + y];
    })(maxI, maxJ);
};

var minPathSum2 = function (grid) {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[i].length - 1; j >= 0; j--) {
            if (j === grid[i].length - 1) {
                if (i !== grid.length - 1) {
                    grid[i][j] = grid[i][j] + grid[i + 1][j];
                }
            } else {
                if (i !== grid.length - 1) {
                    grid[i][j] = grid[i][j] + Math.min(grid[i + 1][j], grid[i][j + 1]);
                } else {
                    grid[i][j] = grid[i][j] + grid[i][j + 1];
                }
            }

        }
    }

    return grid[0][0];
};

// console.log(minPathSum2([
//     [5, 1, 0, 4, 0, 1, 1, 6, 7, 3, 9, 9, 4, 6, 8, 1],
//     [9, 1, 0, 6, 4, 2, 8, 0, 1, 6, 0, 2, 7, 9, 0, 4],
//     [3, 2, 0, 3, 3, 3, 1, 3, 7, 3, 2, 1, 1, 2, 2, 0],
//     [5, 2, 8, 2, 7, 6, 2, 0, 5, 3, 2, 4, 4, 4, 8, 9],
//     [7, 0, 5, 2, 4, 6, 7, 1, 1, 1, 2, 2, 6, 6, 4, 1],
//     [0, 3, 5, 9, 1, 8, 0, 6, 3, 4, 0, 9, 9, 0, 9, 8],
//     [3, 4, 0, 7, 2, 8, 0, 4, 9, 4, 8, 5, 2, 5, 9, 4],
//     [0, 4, 4, 1, 4, 6, 0, 7, 0, 2, 7, 1, 3, 8, 9, 8],
//     [2, 0, 7, 4, 0, 7, 0, 1, 1, 1, 9, 5, 6, 8, 9, 6],
//     [4, 3, 9, 9, 1, 9, 8, 4, 2, 7, 5, 7, 5, 5, 5, 9],
//     [7, 4, 6, 9, 1, 8, 0, 4, 9, 9, 9, 7, 9, 8, 3, 4],
//     [4, 3, 5, 7, 4, 5, 1, 8, 3, 7, 7, 0, 4, 4, 2, 3],
//     [8, 0, 2, 9, 8, 2, 5, 8, 4, 4, 7, 3, 5, 1, 9, 1],
//     [6, 4, 8, 2, 2, 2, 1, 7, 1, 8, 7, 5, 5, 1, 0, 3],
//     [1, 2, 5, 0, 6, 0, 0, 0, 7, 7, 6, 4, 0, 5, 5, 8],
//     [2, 5, 1, 4, 9, 4, 1, 0, 2, 0, 5, 7, 4, 7, 3, 5],
//     [9, 8, 7, 8, 8, 9, 8, 5, 9, 6, 9, 9, 2, 6, 0, 6],
//     [4, 1, 2, 3, 5, 5, 4, 9, 5, 1, 9, 9, 9, 2, 7, 0],
//     [0, 6, 8, 0, 6, 9, 8, 7, 5, 7, 8, 9, 6, 8, 5, 0]
// ]));

/**
 * 260. 只出现一次的数字 III
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber3 = function (nums) {
    let xor = 0;

    //按位异或，得出两个一次的数字中不同的那几位
    for (let v of nums) {
        xor ^= v;
    }

    //得出不同的那几位中最后一位，即10...00
    let mask = xor & -xor, arr = [0, 0];

    //通过与最后不同的那一位‘&’操作，将数组分成两个数组，一个数组那一位都为0，另一个都为1，且除了只出现一次的那一个，别的都是两两成双，于是异或掉其他全部，只剩那一个一次的。
    for (let v of nums) {
        if (mask & v === 0) {
            arr[0] ^= v;
        } else {
            arr[1] ^= v;
        }
    }

    return arr;
};

/**
 * 136. 只出现一次的数字
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber2 = function (nums) {

    //按位异或，得出两个一次的数字中不同的那几位
    for (let i = 0; i < nums.length - 1; i++) {
        nums[i + 1] = nums[i + 1] ^ nums[i];
    }
    return nums[nums.length - 1];
};

/**
 * 137. 只出现一次的数字 II
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {

};

/**
 * 139. 单词拆分
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    let dp = [];
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDict.includes(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return !!dp[s.length];
};

/**
 * 140. 单词拆分 II
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak2 = function (s, wordDict) {
    let dp = [], resultArr = [];
    dp[0] = [0];

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && dp[j].length > 0 && wordDict.includes(s.substring(j, i))) {
                if (dp[i]) {
                    dp[i].push(j);
                } else
                    dp[i] = [j];
            }
        }
    }

    (function loop(s, arr, index, string) {
        if (!arr[index]) {
            return;
        }

        arr[index].forEach(item => {
            if (item === 0) {
                resultArr.push(s.substring(item, index) + (string ? (' ' + string) : ''));
            } else {
                loop(s, arr, item, s.substring(item, index) + (string ? (' ' + string) : ''));
            }
        });
    })(s, dp, s.length, '');

    return resultArr;
};

// console.log(wordBreak2('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']));

/**
 * 44. 通配符匹配 not done
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if ((s && !p)) {
        return false;
    }
    if (p === s) {
        return true;
    }

    let dp = [[true, p[0] === '*'], [p[0] === '*']];

    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (!dp[i]) {
                dp[i] = [];
            }
            if (s[i - 1] === p[j - 1] || p[j - 1] === '?') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i - 1][j - 1] || dp[i][j - 1] || dp[i - 1][j];
            } else {
                dp[i][j] = false;
            }
        }
    }

    return dp[s.length][p.length];
};

// console.log(isMatch('aab', 'c*a*b'));

/**
 * 316. 去除重复字母
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    let initialIndex = 'a'.charCodeAt(), resultArray = [];

    for (let i = 0; i < s.length; i++) {
        if (!resultArray[s[i].charCodeAt() - initialIndex]) {
            resultArray[s[i].charCodeAt() - initialIndex] = s[i];
        }
    }

    return resultArray.filter(item => !!item).join('');
};

/**
 * 55. 跳跃游戏
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let index = 0;

    return (function loop(arr, index) {

    })(nums, index);
};

/**
 * 20. 有效的括号
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let array = s.split('');

    if (array.length === 0) {
        return true;
    }

    for (let i = 0; i < array.length; i++) {
        switch (array[i]) {
            case '(':
            case '[':
            case '{':
                break;
            case ')':
                if (i > 0 && array[i - 1] === '(') {
                    array.splice(i - 1, 2);
                    i -= 2;
                } else {
                    return false;
                }
                break;
            case ']':
                if (i > 0 && array[i - 1] === '[') {
                    array.splice(i - 1, 2);
                    i -= 2;
                } else {
                    return false;
                }
                break;
            case '}':
                if (i > 0 && array[i - 1] === '{') {
                    array.splice(i - 1, 2);
                    i -= 2;
                } else {
                    return false;
                }
        }
    }
    if (array.length === 0) {
        return true;
    }

    return false;
};

// console.log(isValid('{[]}'));

/**
 * 26. 删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let i = 0;
    if (nums.length === 0) {
        return 0;
    }

    for (let j = 1; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
};

// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

/**
 * 55. 最大子序和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    if (nums.length === 0) {
        return;
    }
    let sum = 0, result = nums[0];

    for (let i = 0; i < nums.length; i++) {
        if (sum < 0) {
            sum = nums[i];
        } else {
            sum += nums[i];
        }

        result = Math.max(sum, result);
    }
    return result;
};

/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let j = 0, max = m;

    for (let i = 0; i < nums1.length; i++) {
        if (nums1[i] > nums2[j]) {
            nums1.splice(i, 0, nums2[j]);
            j++;
            max++;
            continue;
        }
        if (i > max - 1 && j <= n - 1) {
            let x = nums2.splice(j, n);
            nums1.splice(i, 0, ...x);
            break;
        }
        if (j > n - 1) {
            break;
        }
    }

    nums1.splice(m + n, Infinity);
};

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 104. 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {

    return (function loop(tree, num) {
        if (tree && (!!tree.val || tree.val === 0)) {
            num++;
            return Math.max(loop(tree.right, num), loop(tree.left, num));
        } else {
            return num;
        }
    })(root, 0);
};

/**
 * 121. 买卖股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit3 = function (prices) {
    let min = prices[0], profit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
        } else {
            profit = Math.max(profit, prices[i] - min);
        }
    }

    return profit;
};

/**
 * 125. 验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    let arr = s.toUpperCase().split('').filter(token => !!/^\w$/.test(token));

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[arr.length - 1 - i]) {
            return false;
        }
        if (i >= arr.length - 1 - i) {
            break;
        }
    }

    return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama'));

/*155 最小栈start*/

/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.array = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
    this.array.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.array.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.array[this.array.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    let min = this.array[0];

    for (let i = 0; i < this.array.length; i++) {
        if (min > this.array[i]) {
            min = this.array[i];
        }
    }

    return min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/*155 最小栈end*/

/**
 * 167. 两数之和 II - 输入有序数组
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let j = numbers.length - 1, i = 0;

    while (i < j) {
        let add = numbers[i] + numbers[j];
        if (add === target) {
            return [i + 1, j + 1];
        } else if (add < target) {
            i++;
        } else {
            j--;
        }
    }

    return [-1, -1];
};


/**
 * 172. 阶乘后的零
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
    let count = 0, k = 1;

    while (5 ** k <= n) {
        count += Math.floor(n / (5 ** k));
        k++;
    }
    return count;
};

/**
 * 169. 多数元素
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let obj = {};

    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]]) {
            obj[nums[i]]++;
        } else {
            obj[nums[i]] = 1;
        }
        if (obj[nums[i]] >= nums.length / 2) {
            return nums[i];
        }
    }

    return;
};
var majorityElement2 = function (nums) {
    if (nums.length === 0) {
        return;
    }
    let sum = 0, major = nums[0];

    for (let i = 0; i < nums.length; i++) {
        if (sum === 0) {
            major = nums[i];
        }
        if (nums[i] === major) {
            sum++;
        } else {
            sum--;
        }
    }

    return major;
};

/**
 * 190. 颠倒二进制位
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    let nums = n.toString(2).split('');

    while (nums.length < 32) {
        nums.unshift('0');
    }

    for (let i = 0; i < nums.length; i++) {
        if (i < nums.length / 2) {
            let temp = nums[i];
            nums[i] = nums[nums.length - 1 - i];
            nums[nums.length - 1 - i] = temp;
        } else {
            break;
        }
    }

    return parseInt(nums.join(''), 2);
};

/**
 * 191. 位1的个数
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    let i = 0, num = 0;

    while (2 ** i < n / 2) {
        i++;
    }

    while (i >= 0) {
        if (2 ** i <= n) {
            n -= 2 ** i;
            num++;
        }
        i--;
    }
    return num;
};

/**
 * 198. 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {

    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return nums[0];
    }

    for (let i = 2; i < nums.length; i++) {
        nums[i] = ((i - 3 >= 0) ? Math.max(nums[i - 3], nums[i - 2]) : nums[i - 2]) + nums[i];
    }

    return Math.max(nums[nums.length - 1], nums[nums.length - 2]);
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 203. 移除链表元素
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    if (!head) {
        return head;
    }
    let result, newHead = {};
    newHead.val = null;
    newHead.next = head;
    result = newHead;
    while (result && result.next) {
        if (result.next.val === val) {
            result.next = result.next.next;
        }
        result = result.next;
    }
    return head;
};

/**
 * 206. 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let prev = null, curr = head;

    while (curr.next) {
        let next = head.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
};
// var reverseList2 = function (head) {
//     let prev = null, current = head;
//
//     (function loop(current) {
//         if (current.next) {
//             loop(current.next, )
//         } else {
//             current.next = prev;
//         }
//     })(current, prev);
// };

/**
 * 219. 存在重复元素 II
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    let arr = [];

    for (let i = 0; i < nums.length; i++) {
        if (arr[nums[i]]) {
            arr[nums[i]]++;
        } else {
            arr[nums[i]] = 1;
        }

        if (i >= k + 1) {
            arr[nums[i - k - 1]]--;
        }
        if (arr[nums[i]] > 1) {
            return true;
        }
    }
    return false;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 226. 翻转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    (function revert(root) {
        if (!root) {
            return;
        }
        if (root.left) {
            revert(root.left);
        }
        if (root.right) {
            revert(root.right);
        }
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
    })(root);
    return root;
};
var invertTree2 = function (root) {
    let current = root;
    while (current && current.left) {

    }
    return root;
};

/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
    this.array = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.array.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    return this.array.shift();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    return this.array[0];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.array.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

/**
 * 263. 丑数
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function (num) {
    let result = num;
    if (!num) {
        return false;
    }
    while (result % 2 === 0 || result % 3 === 0 || result % 5 === 0) {
        if (result % 2 === 0) {
            result = result / 2;
        }
        if (result % 3 === 0) {
            result = result / 3;
        }
        if (result % 5 === 0) {
            result = result / 5;
        }
    }

    return result === 1;
};

/**
 * 283. 移动零
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    for (let i = nums.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (nums[j] === 0 && nums[i + 1] !== 0) {
                let temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
    return nums;
};

/**
 * 342. 4的幂
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function (num) {
    if (num === 0) {
        return false;
    }
    while (num % 4 === 0) {
        num = num / 4;
    }
    return num === 1 || num === 0;
};

/**
 * 349. 两个数组的交集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    let obj = {}, result = [];
    for (let v of nums1) {
        obj[v] = 1;
    }
    for (let v of nums2) {
        if (obj[v]) {
            obj[v] = 2;
        }
    }
    for (let key in obj) {
        if (obj[key] === 2) {
            result.push(key);
        }
    }
    return result;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 437. 路径总和 III
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
    if (!root) {
        return 0;
    }
    let result = 0;
    (function loop(root, path) {
        if (path === sum) {
            result++;
        }
        if (root.left) {
            loop(root.left, path + root.left.val);
            path && loop(root.left, root.left.val);
        }
        if (root.right) {
            loop(root.right, path + root.right.val);
            path && loop(root.right, root.right.val);
        }
    })(root, root.val);

    return result;
};

/**
 * 371. 两整数之和
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
    while (b !== 0) {
        let carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 501. 二叉搜索树中的众数
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
    let obj = {}, max = [];

    if (!root) {
        return;
    }

    max.push(root.val);

    (function loop(current) {
        if (current.val) {
            if (obj[current.val]) {
                obj[current.val]++;
            } else {
                obj[current.val] = 1;
            }
        }
        if (current.left) {
            loop(current.left);
        }
        if (current.right) {
            loop(current.right);
        }
    })(root);

    Object.keys(obj).forEach(key => {
        if (obj[key] > obj[max[0]]) {
            max = [key];
        } else if (obj[key] === obj[max[0]] && (key !== max[0])) {
            max.push(key);
        }
    });
    return max;
};

/**
 * 1260. 二维网格迁移
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
    let m = grid.length, n = grid[0].length, newArr = [];
    k = k % (m * n);
    // while (k > 0) {
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            let newJ = (j + k) % n, newI = (Math.floor((j + k) / n) + i) % m;
            // if (newI < i || (newI === i && newJ < j)) {
            if (!newArr[newI]) {
                newArr[newI] = [];
            }
            newArr[newI][newJ] = grid[i][j];
            // } else {
            //     grid[newI][newJ] = grid[i][j];
            // }
        }
    }

    return newArr;
    // k--;
    // }
};

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 2. 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let current1 = l1, current2 = l2, carry = false, newL = new ListNode(null), current3 = newL;
    while (current1 || current2 || carry) {
        current3.next = new ListNode(null);
        current3 = current3 && current3.next;
        current3.val = ((current1 && current1.val) || 0) + ((current2 && current2.val) || 0);
        if (carry) {
            current3.val++;
            carry = false;
        }
        if (current3.val >= 10) {
            carry = true;
            current3.val = current3.val % 10;
        } else {
            carry = false;
        }
        current1 = current1 && current1.next;
        current2 = current2 && current2.next;
    }

    return newL.next;
};

/**
 * 3. 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) {
        return 0;
    }
    let arr = s.split(''), obj = [], max = 1;

    for (let i = 0; i < arr.length; i++) {
        let index = obj.findIndex(item => item === arr[i]);
        if (index === -1) {
            obj.push(arr[i]);
        } else {
            max = Math.max(max, obj.length);
            obj.splice(0, index + 1);
        }
    }
    max = Math.max(max, obj.length);
    return max;
};

/**
 * 15. 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let obj = {}, result = [];

    nums = quick(nums);

    if (nums.length < 3) {
        return result;
    }

    for (let i = 0; i < nums.length; i++) {
        let obj2 = {};
        let target = -nums[i];
        if (target in obj || nums[i] > 0) {
            continue;
        } else {
            obj[target] = i;
        }
        for (let j = i + 1; j < nums.length; j++) {
            if ((obj2[nums[j]] || obj2[nums[j]] === 0)) {
                if (result.length === 0 || result[result.length - 1].join('-') !== [nums[i], obj2[nums[j]], nums[j]].join('-')) {
                    result.push([nums[i], obj2[nums[j]], nums[j]]);
                }
            } else {
                obj2[target - nums[j]] = nums[j];
            }
        }
    }
    return result;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 24. 两两交换链表中的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    let current = head;

    while (current) {
        let next = current.next;
        current.next = next.next;
        next.next = current;
        current = current.next;
    }

    return head;
};