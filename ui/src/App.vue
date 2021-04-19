<!--
 * @Author: xr
 * @Date: 2021-03-20 12:05:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 15:22:46
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\App.vue
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
    setup () {
    }
}
</script>