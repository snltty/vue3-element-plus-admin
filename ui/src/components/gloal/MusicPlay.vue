<!--
 * @Author: xr
 * @Date: 2021-04-05 15:50:11
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:06:41
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\MusicPlay.vue
-->
<template>
    <el-dialog title="播放音频" v-model="show" destroy-on-close width="400px">
        <div class="t-c">
            <audio controls ref="video">
                <source :src="link" type="video/mp4">
            </audio>
        </div>
    </el-dialog>
    <a href="javascript:;" v-if="url" @click="handlePlay">
        <slot><i class="el-icon-video-play"></i></slot>
    </a>
</template> 
<script>
import { reactive, toRefs, watch } from 'vue'
export default {
    props: ['url'],
    setup (props) {
        const state = reactive({
            show: false,
            link: props.url ? props.url.addHost()[0] : ''
        })
        const handlePlay = () => {
            state.show = true;
        }
        watch(() => props.url, () => {
            state.link = props.url ? props.url.addHost()[0] : ''
        })

        return {
            ...toRefs(state), handlePlay
        }
    }
}
</script>
<style lang="stylus" scoped></style>