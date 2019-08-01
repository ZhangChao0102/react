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