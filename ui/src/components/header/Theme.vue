<!--
 * @Author: xr
 * @Date: 2021-03-25 11:32:27
 * @LastEditors: xr
 * @LastEditTime: 2021-03-26 15:26:53
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \admin-ui\src\components\header\Theme.vue
-->
<template>
    <div class="wrap">
        <a href="javascript:;" @click="showColorPicker = true"><i class="iconpifu iconfont"></i></a>
    </div>
    <el-dialog title="选择颜色" v-model="showColorPicker" destroy-on-close append-to-body :width="200">
        <div class="t-c">
            <el-color-picker class="color-picker" popper-class="theme-picker-dropdown" v-model="color" :predefine="predefineColors">
            </el-color-picker>
        </div>
    </el-dialog>
</template>

<script>     
import { reactive, toRefs, watch } from 'vue'
const version = require('element-plus/package.json').version
let ORIGINAL_THEME = '#409EFF'
export default {
    setup (props, root) {

        const state = reactive({
            chalk: '', // 当前是否已经获取过css样式文件内容，如果获取过，这里会有值，避免多次获取
            showColorPicker: false,
            color: '#409EFF',
            predefineColors: ['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d'],
        })

        const updateStyle = (style, oldCluster, newCluster) => {
            let newStyle = style
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
            })
            return newStyle
        }

        const getCSSString = (url, variable) => {
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        state[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                        resolve()
                    }
                }
                xhr.open('GET', url)
                xhr.send()
            })
        }

        const getThemeCluster = (theme) => {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)
                if (tint === 0) { // when primary color is in its rgb space
                    return [red, green, blue].join(',')
                } else {
                    red += Math.round(tint * (255 - red))
                    green += Math.round(tint * (255 - green))
                    blue += Math.round(tint * (255 - blue))
                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)
                    return `#${red}${green}${blue}`
                }
            }
            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)
                red = Math.round((1 - shade) * red)
                green = Math.round((1 - shade) * green)
                blue = Math.round((1 - shade) * blue)
                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)
                return `#${red}${green}${blue}`
            }
            const clusters = [theme]
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
            }
            clusters.push(shadeColor(theme, 0.1))
            return clusters
        }
        const setCss = (color) => {
            localStorage.setItem('admin-ui-theme-color', color);
            let css = `:root{
                --main-color:#${color};
                --header-bg-color:#${color};
            }`;
            let dom = document.getElementById('theme-style');
            if (!dom) {
                dom = document.createElement("style");
                dom.id = 'theme-style';
                document.body.appendChild(dom);
            }
            dom.innerHTML = css;
        }

        const setTheme = async (color) => {
            if (!color) {
                color = localStorage.getItem('admin-ui-theme-color');
                if (color != 'undefined') {
                    state.color = `#${color}`;
                }
            }
            if (!color || color == 'undefined') {
                return false;
            }
            const oldVal = state.chalk ? state.color : ORIGINAL_THEME
            if (typeof color !== 'string') return
            const themeCluster = getThemeCluster(color.replace('#', ''))
            const originalCluster = getThemeCluster(oldVal.replace('#', ''))
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                    const newStyle = updateStyle(state[variable], originalCluster, themeCluster)
                    let styleTag = document.getElementById(id)
                    if (!styleTag) {
                        styleTag = document.createElement('style')
                        styleTag.setAttribute('id', id)
                        document.head.appendChild(styleTag)
                    }
                    styleTag.innerText = newStyle
                }
            }
            if (!state.chalk) {
                const url = `https://unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`
                await getCSSString(url, 'chalk')
            }
            const chalkHandler = getHandler('chalk', 'chalk-style')
            chalkHandler()
            const styles = [].slice.call(document.querySelectorAll('style'))
                .filter(style => {
                    const text = style.innerText
                    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                })
            styles.forEach(style => {
                const { innerText } = style
                if (typeof innerText !== 'string') return
                style.innerText = updateStyle(innerText, originalCluster, themeCluster)
            })
            setCss(themeCluster[0]);
        }

        setTheme();
        watch(() => state.color, async (color) => {
            setTheme(color);
        });

        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap
    line-height: var(--header-height);
    height: var(--header-height);

    a
        i
            color: rgba(255, 255, 255, 0.9);
            font-size: 2.2rem;
            vertical-align: middle;
</style>