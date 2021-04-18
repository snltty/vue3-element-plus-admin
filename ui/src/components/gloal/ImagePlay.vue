<!--
 * @Author: xr
 * @Date: 2021-04-06 18:57:23
 * @LastEditors: xr
 * @LastEditTime: 2021-04-08 17:44:57
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\gloal\ImagePlay.vue
-->
<template>
    <el-image-viewer v-if="visible" :url-list="data" @close="onClose"></el-image-viewer>
    <span @click="handleOpen">
        <template v-if="data.length > 0">
            <slot :imgs="data">
                <img v-for="(item,index) in data" :key="index" :height="height" :src="item">
            </slot>
        </template>
    </span>
</template>
<script>
import { ref, watch } from 'vue'
export default {
    props: {
        imgs: { type: String, default: '' },
        height: { type: Number, default: 30 },
    },
    setup (props) {

        const visible = ref(false);
        const data = ref(props.imgs.addHost());
        watch(() => props.imgs, () => {
            data.value = props.imgs.addHost();
        })

        const handleOpen = () => {
            visible.value = true;
        }
        const onClose = () => {
            visible.value = false;
        }

        return {
            data, visible, handleOpen, onClose
        }
    }
}
</script>
<style lang="stylus" scoped>
img
    margin-right: 6px;

    &:last-child
        margin: 0;
</style>