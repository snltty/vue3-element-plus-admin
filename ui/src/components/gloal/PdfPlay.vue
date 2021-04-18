<!--
 * @Author: xr
 * @Date: 2021-04-05 15:50:11
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:07:08
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\PdfPlay.vue
-->
<template>
    <el-dialog title="查看PDF" v-model="show" destroy-on-close width="50%" top="1vh">
        <div class="t-c" v-if="show">
            <pdf v-for="i in pdfPages" :key="i" :src="pdfTask" :page="i"></pdf>
        </div>
    </el-dialog>
    <a href="javascript:;" @click="handlePlay">
        <slot><i class="el-icon-video-play"></i></slot>
    </a>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'
import pdf from 'vue3-pdf'
const loadPdf = (url) => {
    return new Promise((resolve, reject) => {
        if (url) {
            let pdfTask = pdf.createLoadingTask(url);
            pdfTask.promise.then(_pdf => {
                resolve({
                    pdfTask: pdfTask,
                    numPages: _pdf.numPages
                })
            }).catch(reject)
        } else {
            reject('pdf加载失败');
        }
    });
}
export default {
    props: ['url'],
    components: { pdf },
    setup (props) {
        const state = reactive({
            show: false,
            pdfTask: '',
            pdfPages: 0,
        })

        watch(() => state.show, (val) => {
            if (val && !state.pdfTask) {
                loadPdf(props.url).then(({ pdfTask, numPages }) => {
                    state.pdfTask = pdfTask;
                    state.pdfPages = numPages;
                })
            }
        })

        const handlePlay = () => {
            state.show = true;
        }
        return {
            ...toRefs(state), handlePlay
        }
    }
}
</script>
<style lang="stylus" scoped></style>