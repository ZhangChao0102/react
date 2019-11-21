function add(a: number, b: number): number {
    return a + b;
}

let myAdd: (a: number, b: number)=>number = function (a: number, b: number): number {
    return a + b;
};

interface test {

}

enum Response {
    no: 0;
    yes: 1;
}