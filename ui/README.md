<!--
 * @Author: xr
 * @Date: 2021-03-22 08:52:14
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:57:23
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\README.md
-->
# element-plus vue3.x 后台界面

## 运行之前
```
修改 /src/configs/index.js 里面对应的配置

npm run install 安装依赖
```

## 运行
```
npm run serve
```

## 构建
```
npm run build
```

## 文件夹结构
```
/src
    /apis  一些接口调用
    /components 一些组件
        /contextMenu 右键菜单
        /global  一些全局注册组件
            ChoiceDialog.vue 弹框选择
            ImagePlay   图片播放
            MusicPlay   音频播放   
            PdfPlay     pdf播放
            VideoPlay   视频播放
        /header 页头组件
            Index.vue   页头
            Lang.vue    多语言
            LognInfo.vue 显示登陆信息
            MenuGroup.vue   显示菜单分组
            Theme.vue   皮肤主题选择
        /layout 布局组件
            /gloal      一些布局的全局组件
                ScrollView.vue 滚动条页面
                TablePage.vue   表格分页部分
                TableSearch.vue 表格搜索部分
                TableView.vue   表格组件
            Group.vue   用于router分组的空白组件   
            Index.vue   用于区分页面的布局组件
        /menu  左边菜单组件
            All.vue 全部菜单组件
            AuthItem.vue    按钮权限项组件
            AuthWrap.vue    按钮权限组组件
            Index.vue   左边菜单
        /tabs   页面页签组件
        /upload 上传组件
            MultipleImage.vue 多图上传
            SelectFile.vue 选择文件
            SingleFile.vue 单文件上传
            SingleImage.vue 单图上传
    /configs    放一些配置
    /directive 放一些自定义指令
    /extends 放一些js扩展(prototype)
    /lang   多语言
    /libs   一些奇怪的方法
        /request    axios封装
        /store  vuex扩展
        cookie.js
        urlHelper.js
        validators.js 表单验证扩展
    /router 路由
        /eachs  一些路由守卫
    /store  vuex

    /views 页面
        
```
