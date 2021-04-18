/*
 * @Author: xr
 * @Date: 2021-03-31 09:31:27
 * @LastEditors: xr
 * @LastEditTime: 2021-03-31 09:31:27
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\libs\urlHelper.js
 */
class UrlHelper {
    parseUrl (url) {
        if (url.indexOf('//') == 0) {
            url = 'http:' + url;
        }
        return new window.URL(url);
    }
    getSearch (name, url) {
        let search = this.parseUrl(url || window.location.href).search;
        if (search && search.indexOf('?') >= 0) {
            search = search.split('?')[1];
        }
        let param = search.split('&').filter(c => c.split('=')[0] == name)[0] || '';
        return unescape(param.split('=')[1] || '');
    }
    updateSearch (name, value, url) {
        const obj = this.parseUrl(url || window.location.href);
        let search = this._removeSearch(obj, name);
        search.splice(0, 0, `${name}=${value}`);
        obj.search = '?' + search.join('&');
        return this.toString(obj);
    }
    removeSearch (name, url) {
        const obj = this.parseUrl(url || window.location.href);
        let search = this._removeSearch(obj, name);
        obj.search = '?' + search.join('&');
        return this.toString(obj);
    }
    _removeSearch (obj, name) {
        let search = obj.search;
        if (search && search.indexOf('?') >= 0) {
            search = search.split('?');
            search = search[1].split('&').filter(c => c.split('=')[0] != name);
        } else {
            search = [];
        }
        return search;
    }
    getHash (name, url) {
        let param = (this.parseUrl(url || window.location.href).hash.split('?')[1] || '').split('&').filter(c => c.split('=')[0] == name)[0] || '';
        return unescape(param.split('=')[1] || '');
    }
    updateHash (name, value, url) {
        const obj = this.parseUrl(url || window.location.href);
        let [left, right] = this._removeHash(obj, name);
        right.splice(0, 0, `${name}=${value}`);
        obj.hash = ('#/' + left + '?' + right.join('&')).replace(/(#\/){2,}/g, '#/');
        return this.toString(obj);
    }
    removeHash (name, url) {
        const obj = this.parseUrl(url || window.location.href);
        let [left, right] = this._removeHash(obj, name);
        obj.hash = ('#/' + left + '?' + right.join('&')).replace(/(#\/){2,}/g, '#/');
        return this.toString(obj);
    }
    _removeHash (obj, name) {
        let [left, right] = obj.hash.split('?');
        if (right) {
            right = right.split('&').filter(c => c.split('=')[0] != name);
        } else {
            right = [];
        }
        return [left, right];
    }
    toString (obj) {
        let url = `${obj.origin}${obj.pathname}${obj.search}${obj.hash}`;
        return url;
    }
}
const urlHelper = new UrlHelper();
export default urlHelper;