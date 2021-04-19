<!--
 * @Author: xr
 * @Date: 2021-03-20 13:31:09
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 09:50:19
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\header\Logo.vue
-->
<template>
    <div>
        <router-link to="/">
            <img src="../../assets/logo-white.svg" :alt="siteName">
            <span>{{siteName}}</span>
        </router-link>
    </div>
</template>
<script>
import config from '../../configs/index'
export default {
    setup () {
        return {
            siteName: config.siteName
        }
    }
}
</script>
<style lang="stylus" scoped>
div
    padding: 0.9rem 0 0 2rem;
    font-size: 1.5rem;
    width: 16rem;
    box-sizing: border-box;

img
    height: 3rem;
    vertical-align: middle;

span
    vertical-align: middle;

a
    color: var(--header-font-color);
</style>