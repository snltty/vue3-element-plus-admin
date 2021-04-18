<!--
 * @Author: xr
 * @Date: 2021-03-25 11:17:46
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:39:52
 * @version: v1.0.0
 * @Descripttion: 公共菜单分组组件
 * @FilePath: \ui\src\components\layout\Group.vue
-->
<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="$store.state.tabs.keepLiveRoute">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script>
export default {
    name: 'Group'
}
</script>