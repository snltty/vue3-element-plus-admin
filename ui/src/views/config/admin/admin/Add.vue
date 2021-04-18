<!--
 * @Author: xr
 * @Date: 2021-03-31 12:14:01
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 10:45:59
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\admin\Add.vue
-->
<template>
    <el-dialog title="管理员" destroy-on-close v-model="show" center :close-on-click-modal="false" width="300px">
        <el-form ref="formDom" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="关联用户" prop="UserID">
                <ChoiceDialog name="user" selection="single" title="选择用户" v-model="form.UserID">
                    <template #default="{data}">
                        <el-input readonly :value="data.length > 0 ? `${data[0].LoginName}-${data[0].NickName}` : ''"></el-input>
                    </template>
                </ChoiceDialog>
            </el-form-item>
            <el-form-item label="管理名称" prop="Name">
                <el-input v-model="form.Name"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref, toRefs, watch, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { selectNumberValidate } from '../../../../libs/validators'
export default {
    props: ['modelValue'],
    emits: ['success'],
    setup (props, { emit }) {
        const formDom = ref(null);
        const addEditData = inject('add-edit-data');
        const state = reactive({
            show: props.modelValue,
            loading: false,
            form: {
                ID: addEditData.value.ID,
                UserID: addEditData.value.UserID || 0,
                Name: addEditData.value.Name || ''
            },
            rules: {
                Name: [
                    { required: true, message: '必填', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                UserID: [
                    { validator: selectNumberValidate, trigger: 'blur' }
                ]
            },
        });
        watch(() => state.show, (val) => {
            if (!val) {
                setTimeout(() => {
                    emit('update:modelValue', val);
                }, 300);
            }
        });

        const handleSubmit = () => {
            formDom.value.validate((valid) => {
                if (!valid) {
                    return false;
                }

                state.loading = true;
                // addAdmin(state.form).then(({ data, res }) => {
                //     state.loading = false;
                //     if (data.State == 'Success') {
                //         state.show = false;
                //         ElMessage.success('操作成功');
                //         emit('success');
                //     } else {
                //         ElMessage.error(data.Message);
                //     }
                // }).catch((err) => {
                //     state.loading = false;
                // });
            })
        }

        return {
            ...toRefs(state), formDom, handleSubmit
        }
    }
}
</script>
<style lang="stylus" scoped></style>