<!--
 * @Author: xr
 * @Date: 2021-03-31 12:14:01
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:08:06
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\admin\Add.vue
-->
<template>
    <el-dialog title="管理员" destroy-on-close v-model="show" center :close-on-click-modal="false" width="400px">
        <el-form ref="formDom" :model="form" :rules="rules" label-width="60px">
            <el-form-item label="名称" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="form.id <= 0">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <SingleImage ref="uploader" :default="form.avatar"></SingleImage>
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
import SingleImage from '../../../../components/upload/SingleImage'
import { addAdmin, updateAdmin } from '../../../../apis/admin'
import { ElMessage } from 'element-plus'
export default {
    props: ['modelValue'],
    emits: ['success'],
    components: { SingleImage },
    setup (props, { emit }) {
        const formDom = ref(null);
        const addEditData = inject('add-edit-data');
        const state = reactive({
            show: props.modelValue,
            loading: false,
            form: {
                id: addEditData.value.id || 0,
                username: addEditData.value.username || '',
                avatar: addEditData.value.avatar || '',
                password: addEditData.value.password || ''
            },
            rules: {
                username: [
                    { required: true, message: '必填', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '必填', trigger: 'blur' },
                    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
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

        const uploader = ref(null);
        const handleSubmit = () => {
            formDom.value.validate((valid) => {
                if (!valid) {
                    return false;
                }
                state.loading = true;
                const form = JSON.parse(JSON.stringify(state.form));
                //上传图片
                uploader.value.upload().then((img) => {
                    if (img) {
                        form.avatar = img.path;
                    }
                    //选择新增还是更新
                    const fn = form.id > 0 ? updateAdmin : addAdmin;
                    fn(form).then(({ data, res }) => {
                        state.loading = false;
                        if (data.code == 0) {
                            state.show = false;
                            ElMessage.success('操作成功');
                            emit('success');
                        } else {
                            ElMessage.error(data.msg);
                        }
                    }).catch((err) => {
                        state.loading = false;
                    });
                });
            })
        }

        return {
            ...toRefs(state), formDom, handleSubmit, uploader
        }
    }
}
</script>
<style lang="stylus" scoped></style>