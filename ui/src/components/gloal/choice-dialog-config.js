/*
 * @Author: xr
 * @Date: 2021-04-09 16:09:18
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:06:35
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\choice-dialog-config.js
 */
const user = {
    title: '选择用户',
    api: () => {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    code: 0,
                    data: []
                },
                res: {}
            })
        })
    },
    key: 'id',
    columns: [
        { name: 'username', text: '登录名' },
        { name: 'phone', text: '电话' },
        { name: 'nickname', text: '昵称' }
    ],
    searchData: {
        username: { value: '', text: '登录名', condition: 'like' },
        phone: { value: '', text: '电话', condition: 'like' },
        nickname: { value: '', text: '昵称', condition: 'like' },
    }
}
export default {
    user: user
}