<!--
 * @Author: xr
 * @Date: 2021-03-22 00:42:27
 * @LastEditors: xr
 * @LastEditTime: 2021-03-31 09:25:50
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\header\Index.vue
-->
<template>
    <header class="flex">
        <Logo></Logo>
        <MenuGroups></MenuGroups>
        <div class="flex-1"></div>
        <Theme></Theme>
        <!-- <Lang></Lang> -->
        <LoginInfo></LoginInfo>
    </header>
</template>

<script>
import Logo from './Logo'
import LoginInfo from './LoginInfo'
import MenuGroups from './MenuGroups'
import Theme from './Theme'
import Lang from './Lang'
export default {
    name: 'Header',
    components: { Logo, LoginInfo, MenuGroups, Theme, Lang },
    setup () {

        return {}
    }
}
</script>
<style lang="stylus" scoped>
header
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 3;
    height: var(--header-height);
    background-image: linear-gradient(45deg, var(--header-bg-color), var(--header-bg-color));
</style>