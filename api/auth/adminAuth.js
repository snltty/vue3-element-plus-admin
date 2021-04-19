/*
 * @Author: xr
 * @Date: 2021-04-10 00:57:19
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 10:40:14
 * @version: v1.0.0
 * @Descripttion: 后台接口验证方法，需要加在路由中
 * @FilePath: \api\auth\adminAuth.js
 */
const adminAuth = (req, res, next) => {
    const { id, username, superadmin, menus } = req.admin;
    //未登录
    if (id <= 0) {
        return res.status(401).send({ code: 401, msg: '无权限' });
    }
    next();
}
module.exports = adminAuth