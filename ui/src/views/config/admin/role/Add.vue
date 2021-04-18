<!--
 * @Author: xr
 * @Date: 2021-03-31 12:14:01
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 10:47:40
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\role\Add.vue
-->
<template>
    <el-dialog title="角色" destroy-on-close v-model="show" center :close-on-click-modal="false" width="300px">
        <el-form ref="formDom" :model="form" :rules="rules" label-width="60px">
            <el-form-item label="名称" prop="Name">
                <el-input v-model="form.Name"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="0">
                <el-tree :data="menus" node-key="id" ref="tree" show-checkbox :default-checked-keys="form.Menus" :check-strictly="strictly"></el-tree>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref, toRefs, watch, inject, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const getChilds = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        res.push({
            label: item.meta.name,
            id: item.name,
            children: getChilds(item.children || []),
        })
    }
    return res;
}
export default {
    props: ['modelValue'],
    emits: ['success'],
    setup (props, { emit }) {
        const router = useRouter();
        const addEditData = inject('add-edit-data');
        const state = reactive({
            show: props.modelValue,
            loading: false,
            form: {
                ID: addEditData.value.ID,
                Name: addEditData.value.Name || '',
                Menus: (addEditData.value.Menus || '').split(',').filter(c => c.length > 0)
            },
            rules: {
                Name: [
                    { required: true, message: '必填', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            },
            menus: getChilds(router.options.routes.filter(c => c.name == 'Layout')[0].children),
            strictly: true
        });

        watch(() => state.show, (val) => {
            if (!val) {
                setTimeout(() => {
                    emit('update:modelValue', val);
                }, 300);
            }
        });

        onMounted(() => {
            nextTick(() => {
                state.strictly = false;
            })
        })

        const tree = ref(null);
        const formDom = ref(null);
        const handleSubmit = () => {
            formDom.value.validate((valid) => {
                if (!valid) {
                    return false;
                }

                let form = JSON.parse(JSON.stringify(state.form))
                form.Menus = tree.value.getCheckedNodes(false, true).map(c => c.id).join(',');
                state.loading = true;
            })
        }

        return {
            ...toRefs(state), formDom, tree, handleSubmit
        }
    }
}
</script>
<style lang="stylus" scoped></style>