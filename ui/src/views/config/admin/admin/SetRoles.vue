<!--
 * @Author: xr
 * @Date: 2021-03-31 16:37:50
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 10:47:06
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\admin\SetRoles.vue
-->
<template>
    <el-dialog :title="`为【${form.Name}】分配角色`" destroy-on-close v-model="show" center :close-on-click-modal="false" width="400px">
        <el-checkbox-group v-model="checkeds">
            <template v-for="(item,index) in roles" :key="index">
                <div style="margin-bottom:10px;">
                    <el-checkbox :label="item.ID" :value="item.ID">{{item.Name}}</el-checkbox>
                </div>
            </template>
        </el-checkbox-group>
        <template #footer>
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, toRefs, inject, watch } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    props: ['modelValue'],
    setup (props, { emit }) {

        const addEditData = inject('add-edit-data');
        const state = reactive({
            show: props.modelValue,
            loading: false,
            roles: [],
            checkeds: [],
            form: {
                ID: 0,
                Name: addEditData.value.Name || '',
                AdminID: addEditData.value.ID || 0,
                Content: '',
                Type: 'menu',
            }
        });
        watch(() => state.show, (val) => {
            if (!val) {
                setTimeout(() => {
                    emit('update:modelValue', val);
                }, 300);
            }
        });

        const handleSubmit = () => {
            state.form.Content = state.checkeds.join(',');
            state.loading = true;
        }

        return {
            ...toRefs(state), handleSubmit
        }
    }
}
</script>
<style lang="stylus" scoped></style>