<!--
 * @Author: xr
 * @Date: 2021-03-25 16:33:22
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:32:58
 * @version: v1.0.0
 * @Descripttion: 选择文件
 * @FilePath: \ui\src\components\upload\SelectFile.vue
-->
<template>
    <div>
        <div class="trigger" @click="triggerSelect">
            <slot></slot>
        </div>
        <slot name="tip"></slot>
        <input v-if="multiple" multiple type="file" ref="input" @change="onChange">
        <input v-else type="file" ref="input" @change="onChange">
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    props: {
        'disabled': { type: Boolean, default: false },
        'multiple': { type: Boolean, default: false },
    },
    emits: ['change'],
    setup (props, { emit }) {

        const input = ref(null);
        const onChange = (object) => {
            object.target.files.forEach(c => {
                emit('change', c);
            })
            input.value.value = '';
        }
        const triggerSelect = () => {
            if (!props.disabled) {
                input.value.click();
            }
        }
        return {
            onChange, input, triggerSelect
        }
    }
}
</script>
<style lang="stylus" scoped>
input[type=file]
    opacity: 0;
    z-index: -1;
    position: absolute;

.trigger
    display: inline-block;
</style>