<!--
 * @Author: xr
 * @Date: 2021-04-02 11:09:33
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:33:55
 * @version: v1.0.0
 * @Descripttion: 多图上传
 * @FilePath: \ui\src\components\upload\MultipleImage.vue
-->
<template>
    <slot name="list" :imgs="showUrls">
        <template v-for="(item,index) in showUrls" :key="index">
            <div class="el-upload el-upload--picture-card">
                <div>
                    <div class="bg" :style="{'background-image':`url(${item.url})`}"></div>
                    <span class="actions">
                        <span class="delete" @click.stop="handleDel(index)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
            </div>
        </template>
    </slot>
    <SelectFile @change="onFileChange" :multiple="true">
        <template #tip>
            <slot name="tip">
                <div class="el-upload__tip">
                    只能上传 {{acceptTypes}} 文件，且不超过 {{maxSize}}
                </div>
            </slot>
        </template>
        <template #default>
            <slot>
                <div class="el-upload el-upload--picture-card">
                    <i class="el-icon-plus"></i>
                </div>
            </slot>
        </template>
    </SelectFile>
</template>
<script>
import { reactive, toRefs } from 'vue'
import SelectFile from './SelectFile'
import { ElMessage } from 'element-plus'
import AliyunOSS from './oss'
export default {
    props: {
        //KB
        size: { type: Number, default: 500 },
        accept: { type: Array, default: ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'] },
        defaults: { type: String, default: '' },
        path: { type: String, default: '/Uploads/xxx/xxx/' }
    },
    components: { SelectFile },
    setup (props) {

        const oss = new AliyunOSS();
        const state = reactive({
            acceptTypes: props.accept.map(c => c.split('/')[1]).join('/'),
            maxSize: props.size > 1024 ? `${(props.size / 1024).toFixed(2)}MB` : `${props.size}KB`,
            showUrls: props.defaults.addHost().map(c => {
                return {
                    url: c,
                    file: null
                }
            })
        })

        const handleDel = (index) => {
            state.showUrls.splice(index, 1);
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
            state.showUrls.push({
                url: window.URL.createObjectURL(file),
                file: file
            });
        }

        const upload = () => {
            return new Promise(async (resolve, reject) => {
                if (state.showUrls.length > 0) {
                    let results = [];
                    for (let i = 0; i < state.showUrls.length; i++) {
                        let item = state.showUrls[i];
                        if (item.file != null) {
                            let path = `${props.path.replace(/\/$/g, '')}/${Date.now()}${i}.${item.file.name.split('.').slice(-1)[0]}`;
                            await oss.put(path, item.file);
                            results.push({
                                fullPath: path.addHost()[0],
                                path: path
                            })
                        } else {
                            results.push({
                                fullPath: item.url,
                                path: item.url.removeHost()
                            })
                        }
                    }
                    resolve(results);
                } else {
                    resolve();
                }
            });
        }
        const del = (path) => {
            if (path) {
                oss.delete(`/${path.removeHost()}`);
            }
        }
        return { ...toRefs(state), onFileChange, handleDel, upload, del }
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