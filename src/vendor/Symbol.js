let o = new Object();

o[Symbol.iterator] = function () {
    let value = 0;
    return {
        next: function () {
            return {
                value: value++, done: value > 5
            };
        }
    };
};

for (let v of o) {
    console.log(v);
}