<!--
 * @Author: xr
 * @Date: 2021-04-02 11:09:33
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:02:07
 * @version: v1.0.0
 * @Descripttion: 但图片上传
 * @FilePath: \ui\src\components\upload\SingleImage.vue
-->
<template>
    <SelectFile @change="onFileChange">
        <template #tip>
            <slot name="tip">
                <div class="el-upload__tip">
                    只能上传 {{acceptTypes}} 文件，且不超过 {{maxSize}}
                </div>
            </slot>
        </template>
        <template #default>
            <slot :img="showUrl">
                <div class="el-upload el-upload--picture-card">
                    <div v-if="showUrl">
                        <div class="bg" :style="{'background-image':`url(${showUrl})`}"></div>
                        <span class="actions">
                            <span class="delete" @click.stop="handleDel">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                    <i class="el-icon-plus" v-else></i>
                </div>
            </slot>
        </template>
    </SelectFile>
</template>
<script>
import { reactive, toRefs } from 'vue'
import SelectFile from './SelectFile'
import { ElMessage } from 'element-plus'
import { upload as uploadFile } from '../../apis/upload'
export default {
    props: {
        //KB
        size: { type: Number, default: 500 },
        accept: { type: Array, default: ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'] },
        default: { type: String, default: '' }
    },
    components: { SelectFile },
    setup (props) {

        const state = reactive({
            acceptTypes: props.accept.map(c => c.split('/')[1]).join('/'),
            maxSize: props.size > 1024 ? `${(props.size / 1024).toFixed(2)}MB` : `${props.size}KB`,
            showUrl: props.default.addHost()[0],
            file: null
        })

        const handleDel = () => {
            state.file = null;
            state.showUrl = '';
        }
        const onFileChange = (file) => {
            if (file.size / 1024 > props.size) {
                ElMessage.error(`请上传 ${state.maxSize} 以内的图片`);
                return;
            }
            if (!props.accept.includes(file.type)) {
                ElMessage.error(`仅支持 ${state.acceptTypes}`);
                return;
            }
            state.file = file;
            state.showUrl = window.URL.createObjectURL(file);
        }

        const upload = () => {
            return new Promise((resolve, reject) => {
                if (state.file != null) {
                    uploadFile(state.file).then(({ data, res }) => {
                        if (data.code == 0) {
                            resolve({
                                fullPath: data.data.addHost()[0],
                                path: data.data
                            });
                        }
                    });
                } else if (state.showUrl) {
                    resolve({
                        fullPath: state.showUrl,
                        path: state.showUrl.removeHost()
                    })
                } else {
                    resolve();
                }
            });
        }
        return { ...toRefs(state), onFileChange, handleDel, upload }
    }
}
</script>
<style lang="stylus" scoped>
.el-upload--picture-card
    position: relative;

    &:hover
        .actions
            display: block;

    .actions
        position: relative;
        top: 0%;
        left: 0%;
        display: none;

    .bg
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        border-radius: 0.6rem;
        background-position: center;
</style>