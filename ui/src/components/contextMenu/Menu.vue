<!--
 * @Author: xr
 * @Date: 2021-03-20 15:29:50
 * @LastEditors: xr
 * @LastEditTime: 2021-03-22 11:20:15
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \admin-ui\src\components\contextMenu\Menu.vue
-->
<template>
    <div class="contextmenu-wrap" :style="{left:`${x}px`,top:`${y}px`}" v-if="show">
        <ul>
            <li v-for="(item,index) in data" :key="index" @click="handleClickItem(index)">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
import { toRefs } from 'vue';
import { useContextMenu } from './index'
export default {
    setup () {

        const state = useContextMenu();
        const handleClickItem = (index) => {
            state.data[index].action();
        }

        return {
            ...toRefs(state), handleClickItem
        }
    }
}
</script>

<style lang="stylus" scoped>
.contextmenu-wrap
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    border: 1px solid var(--main-border-color);
    background-color: #fff;
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0;
    border-radius: 0.2rem;

    li
        padding: 0.6rem 1rem;
        cursor: pointer;
        color: #666;

        &:hover
            background-color: #f5f5f5;
</style>