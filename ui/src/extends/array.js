/*
 * @Author: xr
 * @Date: 2021-04-14 18:28:48
 * @LastEditors: xr
 * @LastEditTime: 2021-04-14 18:30:58
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\extends\array.js
 */
Array.prototype.indexObjectKey = function (key, value) {
    const list = this;
    for (let i = 0; i < list.length; i++) {
        if (list[i][key] === value) {
            return i;
        }
    }
    return -1;
}