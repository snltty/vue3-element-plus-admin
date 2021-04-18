/*
 * @Author: xr
 * @Date: 2021-03-31 09:34:07
 * @LastEditors: xr
 * @LastEditTime: 2021-03-31 09:34:07
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\libs\cookie.js
 */
class Cookie {
    constructor(name) {
        this.name = name;
    }
    getRootHost () {
        return window.location.hostname.split('.').slice(-2).join('.');
    }
    get (name) {
        name = (name || this.name) || '';
        return this.split(document.cookie, name);

    }
    split (cookie, name) {

        let arrStr = cookie.split('; ');
        for (let i = 0; i < arrStr.length; i++) {
            let temp = arrStr[i].split('=');
            if (temp[0] == name) return unescape(temp[1]);
        }
        return '';
    }
    set (name, value, day, domain) {

        let sso = ';path=/;domain=' + (domain || window.location.hostname);

        if (day) {
            let d = new Date();
            d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toGMTString();
            document.cookie = name + "=" + escape(value) + "; " + expires + sso;
        } else {
            document.cookie = name + "=" + escape(value) + sso;
        }
    }
    removeCN () {
        let arrStr = document.cookie.split('; ');
        let host = this.getRootHost();
        for (let i = 0; i < arrStr.length; i++) {
            let temp = arrStr[i].split('=');
            if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(temp[0])) {

                this.set(escape(temp[0]), temp[1], host);
                this.set(temp[0], temp[1], -1, host);

                this.set(escape(temp[0]), temp[1]);
                this.set(temp[0], temp[1], -1);
            }
        }
    }
}
const $cookie = new Cookie();
export default $cookie;
