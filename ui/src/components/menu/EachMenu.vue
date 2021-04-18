<!--
 * @Author: xr
 * @Date: 2021-03-20 22:14:34
 * @LastEditors: xr
 * @LastEditTime: 2021-04-04 14:34:54
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\menu\EachMenu.vue
-->
<template>
    <section class="ul">
        <template v-for="(item,index) in childs" :key="index">
            <section class="item" :class="{open:opens.indexOf(item.name) >=0,current:item.name == $route.name}" v-if="auths.indexOf(item.name)>=0">
                <slot :item="item"></slot>
                <each-menu :childs="item.children" :auths="auths" :opens="opens" v-slot:default="slotProps">
                    <slot :item="slotProps.item"></slot>
                </each-menu>
            </section>
        </template>
    </section>
</template>

<script>
export default {
    name: 'EachMenu',
    props: {
        childs: {
            type: Array,
            default: []
        },
        auths: {
            type: Array,
            default: []
        },
        opens: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="stylus" scoped>
.ul
    .ul
        height: 0px !important;
        overflow: hidden;
        transition: 0.3s;

    .item
        .item
            padding-left: 1rem;

        &.current
            background-color: #e5e5e5;

        &.open
            >.ul
                height: auto !important;
                transition: 0.3s;
</style>