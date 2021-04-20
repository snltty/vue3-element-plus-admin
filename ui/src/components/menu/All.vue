<!--
 * @Author: xr
 * @Date: 2021-03-21 16:36:28
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 11:27:40
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\menu\All.vue
-->
<template>
    <div class="wrap all-menu">
        <!-- <div class="search">
            <el-input class="all-menu-search" v-model="name" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
        </div> -->
        <div class="content absolute scrollbar h-100">
            <div class="inner">
                <div class="group" v-for="(item,index) in menus" :key="index">
                    <h3>{{index}}</h3>
                    <div class="group-inner flex">
                        <div class="group-item flex-1" v-for="(gitem,gindex) in item" :key="gindex">
                            <div v-if="gitem.hasChild">
                                <h5>{{gitem.text}}</h5>
                                <template v-for="(citem,cindex) in gitem.children" :key="cindex">
                                    <h5 v-if="citem.hasChild">{{citem.text}}</h5>
                                    <router-link v-else :to="{name:citem.name}">{{citem.text}}</router-link>
                                </template>
                            </div>
                            <div v-else>
                                <router-link :to="{name:gitem.name}">{{gitem.text}}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { myMapStates } from '../../libs/store/index'
export default {
    setup () {

        const router = useRouter();
        const { authMenus } = myMapStates('menu', {
            authMenus: (state) => computed(() => state.authMenus)
        });
        const getChildren = (arr) => {
            let res = [];
            for (let i = 0; i < arr.length; i++) {
                let childs = (arr[i].children || []).filter(c => authMenus.value.indexOf(c.name) >= 0);
                res.push({
                    name: arr[i].name,
                    text: arr[i].meta.name,
                    hasChid: childs.length > 0
                });
                if (childs.length > 0) {
                    res = res.concat(getChildren(childs));
                }
            }
            return res;
        }

        const menus = computed(() => {
            let groups = router.options.routes.filter(c => c.name == 'Layout')[0].children;
            let res = {};
            groups.map(group => {
                if (authMenus.value.indexOf(group.name) >= 0) {
                    res[group.meta.name] = group.children.filter(c => authMenus.value.indexOf(c.name) >= 0).map(item => {
                        let childs = (item.children || []).filter(c => authMenus.value.indexOf(c.name) >= 0);
                        return {
                            name: item.name,
                            text: item.meta.name,
                            hasChild: childs.length > 0,
                            children: getChildren(childs)
                        }
                    })
                }
            });
            return res;
        });
        console.log(menus);

        return {
            menus
        }
    }
}
</script>
<style lang="stylus" scoped>
.wrap
    width: 500px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid var(--main-border-color);

    // box-shadow: 0.2rem 1rem 0.6rem rgba(0, 0, 0, 0.1);
    .content
        overflow: auto;

        .inner
            padding: 1rem 0.4rem;

            .group
                padding: 1rem 0;
                border-bottom: 1px solid var(--main-border-color);

                &>h3
                    padding: 0.6rem 1rem;
                    font-size: 1.3rem;

            a, h5
                display: block;
                padding: 0.6rem 1rem;
                color: #666;
                transition: 0.3s;

            a
                text-decoration: underline;

            a:hover
                background-color: #f5f5f5;

            h5
                color: #333;
                padding-bottom: 0rem;
</style>