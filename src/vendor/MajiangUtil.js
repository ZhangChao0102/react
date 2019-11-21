/**
 * 条子  1s~9s
 * 筒子  1b~9b
 * 万子  1m~9m
 * 东南西北  ez, sz, wz, bz
 * 中发白    zx, fx, bx
 * 春夏秋冬梅兰竹菊   ch, xh, qh, dh, mh, lh, zh, jh
 * 癞子  sc
 */

/**
 * 摸牌
 */
function mopai() {

}

/**
 * 打牌
 */
function dapai() {

}

/**
 * 洗牌
 */
function xipai() {

}

/**
 * 是否自摸
 * @param obj
 * obj:{
 *     s: [],
 *     b: [],
 *     m: []
 * }
 */
function isHu(obj) {
    for (let i in obj) {
        if ((i === 'z' || i === 'x') && obj[i].length % 3) {

        }
    }
}

/**
 * 算番
 * @param obj
 * @param type
 */
function calTimes(obj, type) {

}

/**
 * 是否吃
 */
function isChi() {

}

/**
 * 是否碰
 */
function isPeng() {

}

/**
 * 是否杠
 */
function isGang() {

}

/**
 * 是否放炮
 */
function isFang() {

}

/**
 * 手牌转换
 */
function handToPattern(array) {
    let obj = {};

    for (let i = 0; i < array.length; i++) {
        let card = array[i];
        if (obj[card[1]]) {

            if (obj[card[1]][card[0]]) {
                obj[card[1]][card[0]]++;
            } else {
                obj[card[1]][card[0]] = 1;
            }
        } else {
            obj[card[1]] = [card[0]];
            obj[card[1]][card[0]] = 1;
        }
    }

    return obj;
}

console.log(handToPattern(['1s', '2s', '3s', 'ch', 'zx']));