<!--
 * @Author: xr
 * @Date: 2021-03-31 15:39:20
 * @LastEditors: xr
 * @LastEditTime: 2021-04-21 13:29:25
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\layout\gloal\TableSearch.vue
-->
<template>
    <el-form :inline="true" :model="data" class="demo-form-inline">
        <slot></slot>
        <el-form-item v-for="(item,name,index) in data" :key="index" class="w-search">
            <template v-if="item.type == 'select'">
                <el-tooltip :content="item.text" placement="bottom">
                    <el-select class="w-search" size="mini" v-model="item.value" placeholder="请选择" @change="$emit('change',{name:name,type:item.type})">
                        <el-option v-for="(sitem,sindex) in item.options" :key="sindex" :label="sitem.text" :value="sitem.value"></el-option>
                    </el-select>
                </el-tooltip>
            </template>
            <template v-else>
                <el-tooltip :content="item.text" placement="bottom">
                    <el-input v-model="item.value" :placeholder="item.text" size="mini" class="w-search"></el-input>
                </el-tooltip>
            </template>
        </el-form-item>
        <el-form-item>
            <el-button size="mini" @click="$emit('submit')" icon="el-icon-search">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    emits: ['submit', 'change'],
    setup (props) {
        const data = ref(props.data);

        /*
                'name': { value: '', text: '名称'},
                'phone': { value: '', text: '手机'},
                'disabled': {
                    value: -1, text: '状态', type: 'select', unvalue: -1, options: [
                        { value: -1, text: '全部' },
                        { value: 0, text: '启用' },
                        { value: 1, text: '禁用' },
                    ]
                },
        */


        const getParams = () => {
            let arr = data.value;
            let res = {};
            for (let j in arr) {
                let item = arr[j];
                if (item.value !== '' && item.unvalue !== item.value) {
                    res[j] = item.value;
                }
            }
            return res;
        }

        return {
            data, getParams
        }
    }
}
</script>

<style lang="stylus" scoped></style>