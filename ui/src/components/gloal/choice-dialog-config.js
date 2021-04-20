/*
 * @Author: xr
 * @Date: 2021-04-09 16:09:18
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 10:11:29
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\choice-dialog-config.js
 */
import { getRoles } from '../../apis/role'

const role = {
    title: '选择角色',
    api: getRoles,
    key: 'id',
    columns: [
        { name: 'name', text: '名称' },
        { name: 'remark', text: '备注' },
    ],
    searchData: {
        name: { value: '', text: '名称' },
    }
}
export default {
    role: role
}