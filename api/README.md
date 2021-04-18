<!--
 * @Author: xr
 * @Date: 2021-04-10 09:52:00
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:52:31
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\README.md
-->
# 运行之前
```
    创建一个数据库，在这个数据库执行 sql.sql
    
    然后修改config.js里的配置

    然后执行 npm install    安装依赖
```
# 运行
```
node index.js
```

# http 状态码
```
401 为请求失败，需要登录，但是没登录
200 为请求成功
```
# 全局数据返回格式
```
{
    code:0,  
            0成功  -1失败
    data:,   
            单数据      {}  
            列表数据    [{},{},{}]
            分页数据    { 
                            p:1,        当前页
                            ps:10,      页大小
                            count:1,    总数量
                            rows:[]     当前页数据  数组
                        }
    msg:'', 
            错误时的提示信息
}
```

# 接口结构
```
/private  后台接口
    1、index.js   总线， 其它的不同的文件名就是一个路由  
    2、比如 login.js   那地址就是  /private/login 
    3、看login.js 具体的接口
    4、比如 router.post('/login', function (req, res, next) {})
    5、那最后的地址就是  /private/login/login  

/services   访问数据的一些方法，每个表有对应文件去操作

/auth       登录认证需要的一些方法
                adminAuth.js   后台登录验证
                cache.js          缓存方法，用来保存登录信息
                loginAuth.js    前台登录验证
                token.js          生成登录 token的方法

/uploads
            上传的图片保存在这里
            /goods  商品的图片
            /user   用户的头像

config.js   保存一些配置信息  包括数据库连接信息  和  顶级管理员编号
```