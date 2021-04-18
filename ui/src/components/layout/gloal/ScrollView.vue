<!--
 * @Author: xr
 * @Date: 2021-03-22 16:52:05
 * @LastEditors: xr
 * @LastEditTime: 2021-03-22 19:11:44
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \admin-ui\src\components\layout\ScrollView.vue
-->
<template>
    <div class="h-100 relative">
        <div class="absolute scrollbar-10 wrap">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScrollView'
}
</script>
<style lang="stylus" scoped>
.wrap
    overflow: auto;
</style>