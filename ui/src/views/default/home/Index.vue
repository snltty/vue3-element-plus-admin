<!--
 * @Author: xr
 * @Date: 2021-03-20 12:05:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:04:00
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\default\home\Index.vue
-->
<template>
    <ScrollView>
        <div class="wrap">
            <h1 class="t-c">欢迎使用[{{siteName}}]后台管理系统</h1>
            <div class="copy-right t-c">少年郎秃头呀</div>
        </div>
    </ScrollView>
</template>
<script>
import config from '../../../configs/index'
export default {
    name: 'Home',
    setup () {
        return {
            siteName: config.siteName
        }
    }
}
</script>
<style lang="stylus" scoped>
.wrap
    padding: 5rem 5rem 2rem 5rem;

h1
    font-size: 2.5rem;
    color: #555;
    margin-bottom: 3rem;

.copy-right
    color: #666;
</style>
