<!--
 * @Author: xr
 * @Date: 2021-03-23 20:41:22
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:39:13
 * @version: v1.0.0
 * @Descripttion: 按钮权限项 必须作为 AuthWrap 的下级组件   子孙皆可
 * @FilePath: \ui\src\components\menu\AuthItem.vue
-->
<template>
    <template v-if="menus.indexOf(name) >= 0">
        <slot></slot>
    </template>
</template>

<script>
import { inject } from 'vue'
export default {
    props: ['name'],
    setup () {
        const menus = inject('btn-auth-menus');
        return {
            menus
        }
    }
}
</script>
<style lang="stylus" scoped></style>