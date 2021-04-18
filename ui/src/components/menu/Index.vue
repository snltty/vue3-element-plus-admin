<!--
 * @Author: xr
 * @Date: 2021-03-20 13:05:57
 * @LastEditors: xr
 * @LastEditTime: 2021-04-12 09:26:26
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\menu\Index.vue
-->
<template>
    <section class="menu relative main-left-menu">
        <section class="wrap h-100" :class="{unfold:unfold}">
            <section class="ul">
                <section class="item action">
                    <a href="javascript:;" class="flex item-a" @click="handleTriggerFold">
                        <i class="icon el-icon-s-unfold"></i><i class="icon el-icon-s-fold"></i>
                        <span class="text flex-1">菜单列表</span>
                    </a>
                </section>
                <section class="item all-item">
                    <a href="javascript:;" class="flex item-a">
                        <i class="icon iconfont iconquanbu1"></i>
                        <span class="text flex-1">所有菜单</span>
                        <span class="right-icon"><i class="el-icon-arrow-right"></i></span>
                    </a>
                    <div class="all">
                        <All></All>
                    </div>
                </section>
            </section>
            <EchMenu :childs="menus" :auths="authMenus" :opens="openMenus" v-slot:default="slotProps">
                <a href="javascript:;" class="flex item-a" @click="handleTriggerMenu(slotProps.item.name)" v-if="slotProps.item.children && slotProps.item.children.length > 0">
                    <i v-if="slotProps.item.meta.ifont" class="icon iconfont" :class="slotProps.item.meta.ifont"></i>
                    <i v-else-if="slotProps.item.meta.icon" class="icon" :class="slotProps.item.meta.icon"></i>
                    <span class="text flex-1">{{slotProps.item.meta.name}}</span>
                    <span class="more-icon"><i class="el-icon-arrow-right"></i><i class="el-icon-arrow-down"></i></span>
                </a>
                <router-link :to="{name:slotProps.item.name}" class="flex item-a" :class="{current:slotProps.item.name == $route.name}" v-else>
                    <i v-if="slotProps.item.meta.ifont" class="icon iconfont" :class="slotProps.item.meta.ifont"></i>
                    <i v-else-if="slotProps.item.meta.icon" class="icon" :class="slotProps.item.meta.icon"></i>
                    <span class="text flex-1">{{slotProps.item.meta.name}}</span>
                </router-link>
            </EchMenu>
        </section>
    </section>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { myMapStates, myMapActions } from '../../libs/store/index'
import EchMenu from './EachMenu'
import All from './All'
import { useRouter, useRoute } from 'vue-router';
export default {
    components: { EchMenu, All },
    setup () {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            unfold: true
        });
        const handleTriggerFold = () => state.unfold = !state.unfold;

        //打开的菜单
        const triggerMenus = ref([]);
        const getIsIndex = (name) => {
            let index = -1;
            for (let i = 0; i < triggerMenus.value.length; i++) {
                if (triggerMenus.value[i] == name) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        const _getSameLvelMenus = (list, name) => {
            let has = list.filter(c => c.name == name).length > 0;
            if (has) {
                return list.filter(c => c.name != name).map(c => c.name);
            }
            for (let i = 0; i < list.length; i++) {
                if (list[i].children) {
                    let res = _getSameLvelMenus(list[i].children, name);
                    if (res.length > 0) {
                        return res;
                    }
                }
            }
            return [];
        }
        const getSameLevelMenus = (name) => {
            return _getSameLvelMenus(router.options.routes.filter(c => c.name == 'Layout')[0].children, name);
        }
        const handleTriggerMenu = (name) => {
            let index = getIsIndex(name);
            if (index >= 0) {
                triggerMenus.value.splice(index, 1);
            } else {
                triggerMenus.value.push(name);
            }
            //关闭同级其它菜单
            let sameLvelMenus = getSameLevelMenus(name);
            if (sameLvelMenus.length > 0) {
                triggerMenus.value = triggerMenus.value.filter(c => sameLvelMenus.indexOf(c) === -1);
            }
        }

        const { changeGroup } = myMapActions('menu', ['changeGroup'])
        //打开的菜单 被点击的和当前路由所在的 都打开
        const openMenus = computed(() => triggerMenus.value.concat(route.matched.map(c => c.name)))
        const { group, authMenus } = myMapStates('menu', {
            group: (state) => computed(() => state.group),
            authMenus: (state) => computed(() => state.authMenus)
        });
        const menus = computed(() => {
            let groups = router.options.routes.filter(c => c.name == 'Layout')[0].children.filter(c => c.meta.name == group.value);
            if (groups && groups.length > 0) {
                return groups[0].children;
            }
            return [];
        });

        onMounted(() => {
            //改变当前分组
            if (route.matched[1].meta.name != group.value) {
                changeGroup(route.matched[1].meta.name);
            }
            router.afterEach((to) => {
                if (to.matched[1].meta.name != group.value) {
                    changeGroup(to.matched[1].meta.name);
                }
            })
        })

        return {
            ...toRefs(state), handleTriggerFold,
            menus, authMenus, handleTriggerMenu, openMenus
        }
    }
}
</script>
<style lang="stylus" scoped>
section.wrap
    width: 4rem;
    border-right: 1px solid var(--main-border-color);
    transition: 0.3s;
    box-shadow: 0.4rem 0rem 0.6rem rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 9;
    background-color: #f1f1f1;

    &.unfold
        width: 14rem;

        .item
            a.item-a
                span.right-icon, span.more-icon, span.text
                    display: block;

        section.ul
            section.action
                .el-icon-s-unfold
                    display: none;

                .el-icon-s-fold
                    display: block;

section.ul
    section.item
        &.all-item
            border-bottom: 1px solid var(--main-border-color);

            .all
                position: absolute;
                left: 101%;
                top: 0;
                bottom: 0;
                display: none;
                z-index: 3;

        &.all-item:hover
            .all
                display: block;

        &.action
            display: none;
            background-color: #e5e5e5;
            border-bottom: 1px solid var(--main-border-color);

            a
                color: #666;

                .el-icon-s-unfold
                    display: block;

                .el-icon-s-fold
                    display: none;

        &.open
            background-color: #f5f5f5;

            &>a.item-a
                span.more-icon
                    .el-icon-arrow-down
                        display: block;

                    .el-icon-arrow-right
                        display: none;

        a.item-a
            padding: 0.9rem 1rem;
            color: #555;
            font-size: 1.2rem;

            &.open+ul
                height: auto;

            &:hover, &.current
                color: var(--main-color);
                font-weight: bold;

            &.current
                .more-icon
                    .el-icon-arrow-down
                        display: block;

                    .el-icon-arrow-right
                        display: none;

                    i
                        vertical-align: middle;

            span.right-icon, span.more-icon, span.text
                display: none;

            span.text
                line-height: 1.8rem;

            span.right-icon, span.more-icon
                color: #ccc;

            span.more-icon
                .el-icon-arrow-down
                    display: none;

            i.icon
                font-size: 1.8rem;
                vertical-align: top;
                margin-right: 0.4rem;
</style>