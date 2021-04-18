/*
 * @Author: xr
 * @Date: 2021-04-09 09:14:47
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:05:43
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\extends\number.js
 */

Number.prototype.toMoney = function (digits) {
    let num = this;
    if (digits !== undefined) {
        num = num.toFixed(digits);
    }
    return `¥${num}`;
}
Number.prototype.parseMoney = function (digits) {
    let num = this / 100;
    if (digits !== undefined) {
        num = num.toFixed(digits);
    }
    return num;
}