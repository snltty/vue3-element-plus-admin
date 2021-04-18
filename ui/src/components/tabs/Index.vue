<!--
 * @Author: xr
 * @Date: 2021-03-20 15:11:53
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:37:04
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\tabs\Index.vue
-->
<template>
    <div>
        <div class="wrap flex">
            <a href="javascript:;" class="left" v-if="showBtn" @click="handleChangeX(1)"><i class="el-icon-arrow-left"></i></a>
            <div class="flex-1 scroll-wrap" ref="scrollWrapDom">
                <div class="scroll trans" ref="scrollDom" :style="{'transform':`translateX(${translateX}px)`}">
                    <template v-for="(item,index) in list" :key="index">
                        <a href="javascript:;" :class="{current:current==index}" @contextmenu.prevent="onContextmenu($event,index)">
                            <span class="text" @click.capture="handleChangeTabIndex(index)">{{item.text}}</span>
                            <span class="icon"><i class="el-icon-close" @click.stop="handleRemove(index)"></i></span>
                        </a>
                    </template>
                </div>
            </div>
            <a href="javascript:;" class="right" v-if="showBtn" @click="handleChangeX(-1)"><i class="el-icon-arrow-right"></i></a>
        </div>
        <ContextMenu></ContextMenu>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { initContextMenu, Menu } from '../contextMenu/index'
import { useBtnMove } from './btnMove'
import { useRouter } from 'vue-router'
import { myMapActions } from '../../libs/store/index'
export default {
    components: { ContextMenu: Menu },
    setup () {

        const router = useRouter();
        const state = reactive({
            current: 0, mousedownIndex: -1,
            list: []
        });
        const { btnMoveState, handleChangeX, triggerShowBtn } = useBtnMove();
        const { changeKeepLiveRoutes } = myMapActions('tabs', ['changeKeepLiveRoutes']);
        //设置页面缓存  keep-alive
        const setCache = (names) => {
            changeKeepLiveRoutes(Array.from(new Set((names || state.list.map(c => c.name)).concat(['Group']))));
        }
        const jump2current = (query = {}) => {
            router.push({ name: state.list[state.current].name, query: query });
        }
        //删除tab某一项
        const handleRemove = (index) => {
            if (state.list.length == 1) {
                return;
            } else {
                if (index == state.current) {
                    state.current += index > 0 ? -1 : 0;
                }
                state.list.splice(index, 1);
                if (state.current > state.list.length - 1) {
                    state.current = state.list.length - 1;
                }
                jump2current();
                triggerShowBtn();
                setCache();
            }
        }
        //添加tab
        const addTab = (route) => {
            if (!route.name) {
                return false;
            } else {
                const list = state.list;
                let index = list.indexObjectKey('name', route.name);
                //列表中已存在，切换一下
                if (index >= 0) {
                    state.current = index;
                } else {
                    //列表中不存在，添加一项
                    list.push({
                        name: route.name,
                        text: route.meta.name
                    });
                    state.current = list.length - 1;
                }
                if (triggerShowBtn) {
                    triggerShowBtn();
                }
                setCache();
            }
            return true;
        }
        router.afterEach((to, form) => {
            addTab(to);
        });
        addTab(router.currentRoute.value);

        //改变标签
        const handleChangeTabIndex = (index) => {
            state.current = index;
            jump2current();
        }

        //右键菜单
        const { handleShowContextMenu } = initContextMenu();
        const onContextmenu = (ev, index) => {
            handleShowContextMenu({
                x: ev.x, y: ev.y,
                data: [
                    {
                        text: '关闭当前', action: () => {
                            handleRemove(index);
                        }
                    },
                    {
                        text: '关闭其它', action: () => {
                            for (let i = state.list.length - 1; i > index; i--) {
                                handleRemove(i);
                            }
                            for (let i = index - 1; i >= 0; i--) {
                                handleRemove(i);
                            }
                        }
                    },
                    {
                        text: '关闭右侧', action: () => {
                            for (let i = state.list.length - 1; i > index; i--) {
                                handleRemove(i);
                            }
                        }
                    }
                ]
            });
        }

        return {
            ...toRefs(state), handleChangeTabIndex, handleRemove,
            onContextmenu,
            ...toRefs(btnMoveState), handleChangeX
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap
    height: 3.9rem;
    line-height: 3.9rem;
    background-color: #fafafa;
    width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    &>a
        padding: 0 1rem;
        position: relative;
        z-index: 2;
        background-color: #fafafa;
        color: #666;

        &.left
            border-right: 1px solid var(--main-border-color);
            box-shadow: 0.1rem 0 0.6rem rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid var(--main-border-color);
            height: 3.8rem;

        &.right
            border-left: 1px solid var(--main-border-color);
            box-shadow: -0.1rem 0 0.6rem rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid var(--main-border-color);
            height: 3.8rem;

    .scroll-wrap
        position: relative;
        border-bottom: 1px solid var(--main-border-color);

    .scroll
        &.trans
            transition: 0.3s;

        white-space: nowrap;
        position: absolute;
        left: 0;
        top: 0;

        a
            display: inline-block;
            color: #666;
            border: 1px solid transparent;
            border-top: 0;
            margin-left: -1px;

            span.text
                padding: 0 0.5rem 0 1rem;
                display: inline-block;

            span.icon
                padding: 0 1rem 0 0.5rem;

            &.current
                background-color: #fff;
                border-color: transparent var(--main-border-color) transparent var(--main-border-color);
                margin-bottom: -1px;
                color: var(--main-color);

            &:hover
                color: var(--main-color);
</style>