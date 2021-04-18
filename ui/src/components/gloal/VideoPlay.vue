<!--
 * @Author: xr
 * @Date: 2021-04-05 15:50:11
 * @LastEditors: xr
 * @LastEditTime: 2021-04-08 17:17:02
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\gloal\VideoPlay.vue
-->
<template>
    <el-dialog title="播放视频" v-model="show" destroy-on-close width="550px">
        <video width="500" controls ref="video">
            <source :src="link" type="video/mp4">
        </video>
    </el-dialog>
    <a href="javascript:;" v-if="url" @click="handlePlay">
        <slot><i class="el-icon-video-play"></i></slot>
    </a>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
    props: ['url'],
    setup (props) {
        const state = reactive({
            show: false
        })
        const handlePlay = () => {
            state.show = true;
        }

        return {
            ...toRefs(state), handlePlay
            , link: props.url ? props.url.addHost()[0] : ''
        }
    }
}
</script>
<style lang="stylus" scoped></style>