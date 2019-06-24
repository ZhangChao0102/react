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

console.log(waterFall([1, 2, 3], [6, 4, 5, 9, 1, 2]));

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