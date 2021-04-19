<!--
 * @Author: xr
 * @Date: 2021-04-02 11:09:33
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:01:59
 * @version: v1.0.0
 * @Descripttion: 单文件上传
 * @FilePath: \ui\src\components\upload\SingleFile.vue
-->
<template>
    <SelectFile @change="onFileChange">
        <template #tip>
            <div class="el-upload__tip">
                只能上传 {{acceptTypes}} 文件，且不超过 {{maxSize}}
            </div>
        </template>
        <template #default>
            <div class="el-upload el-upload--text">
                <div v-if="showUrl" class="flex file-item">
                    <div class="name flex-1">{{showUrl}}</div>
                    <span class="actions">
                        <span class="delete" @click.stop="handleDel">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
                <el-button v-else size="mini">上传文件</el-button>
            </div>
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
            showUrl: props.default.split('/').slice(-1)[0],
            file: null
        })

        const handleDel = () => {
            state.file = null;
            deleted = state.showUrl.addHost()[0];
            state.showUrl = '';

        }
        const onFileChange = (file) => {
            if (file.size / 1024 > props.size) {
                ElMessage.error(`请上传 ${state.maxSize} 以内的文件`);
                return;
            }
            if (!props.accept.includes(file.type)) {
                ElMessage.error(`仅支持 ${state.acceptTypes}`);
                return;
            }
            state.file = file;
            state.showUrl = file.name;
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
                } else if (props.default) {
                    resolve({
                        fullPath: props.default,
                        path: props.default
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
.el-upload--text
    position: relative;

    .file-item
        line-height: normal;

    .actions
        margin-left: 1rem;
</style>