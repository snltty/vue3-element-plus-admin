/*
 * @Author: xr
 * @Date: 2021-04-03 17:57:23
 * @LastEditors: xr
 * @LastEditTime: 2021-04-08 17:09:14
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\libs\validators.js
 */
export const selectNumberValidate = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请选择'));
    }
    let val = Number(value);
    if (isNaN(val) || val <= 0) {
        callback(new Error('请输入数字值'));
    }
    callback();
};

export const numberValidate = (rule, value, callback) => {
    let val = Number(value);
    if (isNaN(val)) {
        return callback(new Error('请输入数字值'));
    }
    if (rule.min != undefined && val < rule.min) {
        return callback(new Error(`最小值${rule.min}`));
    }
    if (rule.max != undefined && val > rule.max) {
        return callback(new Error(`最大值${rule.max}`));
    }
    callback();
};

export const intValidate = (rule, value, callback) => {

    if (!Number.isInteger(value)) {
        return callback(new Error('请输入整数'));
    }
    return numberValidate(rule, value, callback);
};