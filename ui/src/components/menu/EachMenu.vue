<!--
 * @Author: xr
 * @Date: 2021-03-20 22:14:34
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 09:43:55
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\menu\EachMenu.vue
-->
<template>
    <template v-for="(item,i) in childs" :key="i">
        <template v-if="auths.indexOf(item.name)>=0">
            <template v-if="item.children && item.children.length > 0">
                <el-submenu :index="item.name">
                    <template #title>
                        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                        <i v-else-if="item.meta.ifont" class="iconfont" :class="item.meta.ifont"></i>
                        <span>{{item.meta.name}}</span>
                    </template>
                    <each-menu :childs="item.children" :auths="auths"></each-menu>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.name">
                    <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                    <i v-else-if="item.meta.ifont" class="iconfont" :class="item.meta.ifont"></i>
                    <template #title>{{item.meta.name}}</template>
                </el-menu-item>
            </template>
        </template>
    </template>
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
        }
    }
}
</script>
<style lang="stylus" scoped>
.iconfont
    font-size: 1.8rem;
    vertical-align: middle;
    margin-right: 0.5px;
    width: 2.4rem;
    text-align: center;
    font-weight: 400;
    line-height: 1;
    display: inline-block;
</style>