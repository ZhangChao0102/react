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
    // console.log(time2 - time1);
    return newArr;
};

// console.log(chaRu([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));

/**
 * 希尔排序
 */
let xiEr = function (arr) {
    let increSeq = [], n = 1, step = 0, resultArr = arr.slice();

    /*构造增量序列*/
    while (2 ** n - 1 < arr.length) {
        step = 2 ** n - 1;
        increSeq.push(step);
        n++;
    }
    console.log('increSeq:', increSeq);
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
        // let last = stackArray.pop();
        // stackArray = [last, ...stackArray];
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

// function shell(arr) {
//     let newArr = arr.slice(), length = Math.floor(newArr.length / 2) + 1;
//
//     while (length > 0) {
//         for (let i = 0; i < length; i++) {
//             let j = i;
//             while (j < newArr.length) {
//                 let temp = newArr[j];
//                 if (temp > newArr[j + length]) {
//                     newArr[j] = newArr[j + length];
//                     newArr[j + length] = temp;
//                 }
//                 j += length;
//             }
//         }
//         length = Math.floor(length / 2);
//     }
//
//     return newArr;
// }

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
        return [...loop(arr1, arr1[Math.round(Math.random() * arr1.length)]),
            ...loop(arr2, arr2[Math.round(Math.random() * arr2.length)])];
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
console.log('arr1:', arr1);
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

console.log(radix([1, 8, 7, 6, 5, 1, 2, 3, 0, 0, 0, 4, 4, 6, 2, 4, 1, 9, 3, 3, 3]));
