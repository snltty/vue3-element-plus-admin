/*
 * @Author: xr
 * @Date: 2021-04-08 17:13:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:17:17
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\extends\string.js
 */
import config from '../configs/index'
String.prototype.addHost = function () {
    if (!this) return [];
    return this.split(',').filter(c => c.length > 0).map(c => {
        if (c.indexOf('https://') == 0) {
            return c;
        }
        return config.staticUrl.replace(/\/$/g, '') + '/' + c.replace(/^\//g, '');
    })
}
String.prototype.removeHost = function () {
    let _str = this;
    while (_str.indexOf(config.staticUrl) >= 0) {
        _str = _str.replace(config.staticUrl, '');
    }
    return '/' + (_str.replace(/^\//g, ''));
}