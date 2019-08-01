function sleep(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    });
}

async function red() {
    console.log('red');
    await sleep(3000);
}

async function green() {
    console.log('green');
    await sleep(2000);
}

async function yellow() {
    console.log('yellow');
    await sleep(1000);
}

async function main() {
    let i = 0;
    while (i < 10) {
        i++;
        await red();
        await green();
        await yellow();
    }
}

main();