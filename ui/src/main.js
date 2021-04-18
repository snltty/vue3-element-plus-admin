/*
 * @Author: xr
 * @Date: 2021-03-20 12:05:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:17:29
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css.styl'

//一些扩展
import './extends/index'

const app = createApp(App);

//vuex
import store from './store'
app.use(store);

//路由
import router from './router'
app.use(router);

//一些自定义指令
import directive from './directive/index'
directive(app);

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VMdEditor.use(githubTheme);
app.use(VMdEditor);

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import langs from './lang/index'
langs[enLocale.name].el = enLocale.el;
langs[zhLocale.name].el = zhLocale.el;
const i18n = createI18n({
    locale: zhLocale.name,
    fallbackLocale: enLocale.name,
    messages: langs,
});
app.use(ElementPlus, { i18n: i18n.global.t })
app.use(i18n);

//自动注册的全局组件
import gloalComponents from './components/gloal';
app.use(gloalComponents);
import gloalLayoutComponents from './components/layout/gloal';
app.use(gloalLayoutComponents);
//menu菜单相关的全局组件
import menuComponents from './components/menu/index';
app.use(menuComponents);

app.mount('#app')
