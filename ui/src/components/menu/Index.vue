<!--
 * @Author: xr
 * @Date: 2021-03-20 13:05:57
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 11:26:46
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\menu\Index.vue
-->
<template>
    <section class="menu relative main-left-menu" :class="{collapse:collapse}">
        <section class="wrap h-100">
            <div class="all">
                <div class="flex" @click="collapse = !collapse">
                    <i class="iconfont iconquanbu1"></i>
                    <span class="flex-1">全部菜单</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="all-wrap h-100">
                    <All></All>
                </div>
            </div>
            <el-menu :collapse="collapse" @select="handleSelect" background-color="#fafafa" :default-active="$route.name">
                <EchMenu :childs="menus" :auths="authMenus"></EchMenu>
            </el-menu>
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
            collapse: false
        });

        const { changeGroup } = myMapActions('menu', ['changeGroup'])
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

        const handleSelect = (key, keyPath) => {
            router.push({ name: key });
        }

        return {
            ...toRefs(state),
            menus, authMenus, handleSelect
        }
    }
}
</script>
<style lang="stylus">
.main-left-menu
    border-right: 1px solid var(--main-border-color);
    width: 16rem;
    background-color: #fafafa;
    transition: 0.3s;

    &.collapse
        width: 6.4rem;

        .all
            .all-wrap
                left: 6.5rem;

    .all
        padding-left: 2rem;
        border-bottom: 1px solid #ddd;
        cursor: pointer;

        &>.flex
            height: 3.8rem;
            line-height: 3.8rem;
            font-size: 1.3rem;
            white-space: nowrap;
            overflow: hidden;

            .iconfont
                font-size: 1.8rem;
                vertical-align: middle;
                margin-right: 0.5px;
                width: 2.4rem;
                text-align: center;
                font-weight: 400;

            i[class^=el-icon-]
                line-height: inherit;
                margin-right: 2rem;

        .all-wrap
            position: absolute;
            left: 16.1rem;
            top: 0;
            z-index: 9999;
            display: none;
            transition: 0.3s;

        &:hover
            .all-wrap
                display: block;

.el-menu-item, .el-submenu__title
    height: 4rem;
    line-height: 4rem;
    font-size: 1.3rem;

.el-submenu .el-menu-item
    height: 4rem;
    line-height: 4rem;
    min-width: auto;

.el-menu
    border: 0;
</style>