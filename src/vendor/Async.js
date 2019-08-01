async function a(array) {
    for await (let x of array) {
        myPromise(x);
    }
}

function myPromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

const asyncArray = {
    a: 1000,
    b: 2000,
    c: 3000,
    [Symbol.asyncIterator]: () => {
        let i = 0;
        return {
            next() {

            }
        };
    }
};

const actions = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
]

async function process (actions) {
    for (const action of actions) {
        await console.log(action)
    }
}
process(actions);
// a([1000, 2000, 3000]);