<!--
 * @Author: xr
 * @Date: 2021-03-21 19:17:44
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:09:23
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\layout\gloal\TableView.vue
-->
<template>
    <div class="h-100 relative">
        <div class="absolute  flex flex-column flex-nowrap">
            <div class="table-search">
                <slot name="search"></slot>
            </div>
            <div class="table-head" v-if="head">
                <slot name="head"></slot>
            </div>
            <div class="table-body flex-1 relative">
                <div class="body-inner absolute">
                    <slot name="body"></slot>
                </div>
            </div>
            <div class="table-foot t-c">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        head: { type: Boolean, default: true },
    },
    name: 'TableView'
}
</script>
<style lang="stylus" scoped>
.table-head
    border: 1px solid var(--main-border-color);
    border-bottom: 0;
    padding: 0.6rem;
    background-color: #fbfbfb;

.table-search
    border: 1px solid var(--main-border-color);
    border-bottom: 0;
    padding: 0.6rem;
    background-color: #fcfcfc;

.table-foot
    padding: 1rem 0;
</style>