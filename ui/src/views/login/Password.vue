<!--
 * @Author: xr
 * @Date: 2021-03-21 21:38:05
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 10:35:46
 * @version: v1.0.0
 * @Descripttion: 密码登录
 * @FilePath: \ui\src\views\login\Password.vue
-->
<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="formDom" @keyup.enter="submitForm" label-width="0">
            <el-form-item label="" prop="pass">
                <el-input prefix-icon="el-icon-date" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
                <el-input prefix-icon="el-icon-date" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="t-c">
                <el-button type="primary" @click="submitForm" style="width:100%" :loading="loading">立即登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { login } from '../../apis/login'
import { ElMessage } from 'element-plus'
export default {
    emits: ['success'],
    setup (props, { emit }) {
        const formState = reactive({
            ruleForm: {
                username: process.env.NODE_ENV === 'production' ? '' : 'admin',
                password: process.env.NODE_ENV === 'production' ? '' : '123456'
            },
            rules: {
                username: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
            },
            loading: false
        })


        const formDom = ref(null);
        const submitForm = () => {
            formDom.value.validate((valid) => {
                if (!valid) return;

                formState.loading = true;
                login(formState.ruleForm.username, formState.ruleForm.password).then(({ data, res }) => {
                    formState.loading = false;
                    if (data.code == 0) {
                        ElMessage.success({
                            message: '登录成功!',
                            type: 'success'
                        });
                        //交给外面处理
                        emit('success', data);
                    } else {
                        ElMessage.error(data.msg);
                    }

                }).catch(() => {
                    formState.loading = false;
                });
            });
        }
        return {
            ...toRefs(formState), formDom, submitForm
        }
    }
}
</script>
<style lang="stylus" scoped></style>