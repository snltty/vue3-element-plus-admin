<!--
 * @Author: xr
 * @Date: 2021-03-21 22:57:06
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:40:22
 * @version: v1.0.0
 * @Descripttion: 布局组件 用于区别不需要公共界面的页面   比如 登录页面
 * @FilePath: \ui\src\components\layout\Index.vue
-->
<template>
    <AuthWrap>
        <div class="h-100 absolute flex flex-column flex-nowrap">
            <Header></Header>
            <main class="flex-1 flex">
                <Menu></Menu>
                <section class="right flex-1 flex flex-column">
                    <Tabs></Tabs>
                    <div class="flex-1 body relative">
                        <router-view v-slot="{ Component }">
                            <keep-alive :include="$store.state.tabs.keepLiveRoute">
                                <component :is="Component" />
                            </keep-alive>
                        </router-view>
                    </div>
                </section>
            </main>
        </div>
    </AuthWrap>
</template>

<script>
import Header from '../header/Index'
import Menu from '../menu/Index.vue'
import Tabs from '../tabs/Index'
export default {
    name: 'Layout',
    components: { Header, Menu, Tabs },
}
</script>
<style lang="stylus" scoped>
.body
    padding: 1rem;
</style>
