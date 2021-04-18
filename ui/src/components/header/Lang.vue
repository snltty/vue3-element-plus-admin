<!--
 * @Author: xr
 * @Date: 2021-03-26 15:08:04
 * @LastEditors: xr
 * @LastEditTime: 2021-03-26 15:49:32
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\header\Lang.vue
-->
<template>
    <div class="wrap">
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-basketball ball"></i> {{langNames[lang] || '未知语言'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item,index) in langNames" :key="index" @click="handleTrggerLang(index)">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
export default {
    setup () {
        const { ctx } = getCurrentInstance();
        const state = reactive({
            lang: localStorage.getItem('lang') || 'zh-cn',
            langNames: { 'en': 'English', 'zh-cn': '中文' }
        });
        const handleTrggerLang = (lang) => {
            state.lang = lang;
            localStorage.setItem('lang', lang);
            ctx.$root.$i18n.locale = lang;
        }
        onMounted(() => {
            ctx.$root.$i18n.locale = state.lang;
        })

        return {
            ...toRefs(state), handleTrggerLang
        }
    }
}
</script>
<style lang="stylus" scoped>
.wrap
    padding: 0 2rem;
    height: var(--header-height);
    line-height: var(--header-height);

    span
        color: rgba(255, 255, 255, 0.8);

        i.ball
            vertical-align: middle;
            font-size: 2.2rem;
</style>