<!--
 * @Author: xr
 * @Date: 2021-03-23 19:30:59
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:39:29
 * @version: v1.0.0
 * @Descripttion: 按钮权限组  作为 AuthItem的上级组件
 * @FilePath: \ui\src\components\menu\AuthWrap.vue
-->
<template>
    <slot></slot>
</template>
<script>
import { computed, provide } from 'vue'
import { myMapStates } from '../../libs/store/index'
export default {
    name: 'BtnsAuth',
    setup () {
        const { authMenus } = myMapStates('menu', {
            authMenus: (state) => computed(() => state.authMenus)
        });
        provide('btn-auth-menus', authMenus);
    }
}
</script>