<!--
 * @Author: xr
 * @Date: 2021-03-20 19:13:19
 * @LastEditors: xr
 * @LastEditTime: 2021-04-03 22:05:12
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\header\MenuGroups.vue
-->
<template>
    <div>
        <template v-for="(item,index) in groups" :key="index">
            <a href="javascript:;" :class="{current:item.meta.name == group}" @click="handleChangeGroup(item.meta.name)">
                <i v-if="item.meta.ifont" class="iconfont" :class="item.meta.ifont"></i>
                <i v-else-if="item.meta.icon" :class="item.meta.icon"></i><span>{{item.meta.name}}</span>
            </a>
        </template>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { myMapStates, myMapActions } from '../../libs/store/index'
export default {
    setup () {
        const router = useRouter();

        const { group, authMenus } = myMapStates('menu', {
            group: (state) => computed(() => state.group),
            authMenus: (state) => computed(() => state.authMenus),
        });
        const groups = computed(() => {
            return router.options.routes.filter(c => c.name == 'Layout')[0].children.filter(c => authMenus.value.indexOf(c.name) >= 0)
        });
        const { changeGroup } = myMapActions('menu', ['changeGroup']);
        const handleChangeGroup = (name) => {
            changeGroup(name);
        };
        return {
            groups, group, handleChangeGroup
        }
    }
}
</script>

<style lang="stylus" scoped>
div
    font-size: 1.3rem;
    padding-left: 1px;
    font-size: 0;

    a
        display: inline-block;
        padding: 0 1rem;
        color: rgba(255, 255, 255, 0.8);
        border-width: 0 1px;
        border-color: transparent;
        border-style: solid;
        margin-left: -1px;
        font-size: 1.3rem;
        height: var(--header-height);
        line-height: var(--header-height);

        i
            font-size: 1.6rem;
            vertical-align: middle;

        span
            vertical-align: middle;

        &:hover, &.current
            background-color: rgba(0, 0, 0, 0.1);
            border-color: transparent rgba(0, 0, 0, 0.1);
</style>