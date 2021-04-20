<!--
 * @Author: xr
 * @Date: 2021-03-31 16:37:50
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 11:14:30
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\admin\SetRoles.vue
-->
<template>
    <el-dialog :title="`为【${form.username}】分配角色`" destroy-on-close v-model="show" center :close-on-click-modal="false" width="400px">
        <div>
            <el-tag v-for="item in checkeds" :key="item.id" effect="dark" closable @close="handleCloseTag(item)">
                {{ item.name }}
            </el-tag>
            <ChoiceDialog v-model="roleIds" name="role" @success="handleChoice">
                <template #default>
                    <el-button size="small">选择角色</el-button>
                </template>
            </ChoiceDialog>
        </div>
        <template #footer>
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, toRefs, inject, watch, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus'
import { getPower, setPower } from '../../../../apis/admin'
export default {
    props: ['modelValue'],
    setup (props, { emit }) {

        const addEditData = inject('add-edit-data');
        const state = reactive({
            show: props.modelValue,
            loading: false,
            roleIds: '',
            checkeds: [],
            form: {
                id: addEditData.value.id || 0,
                username: addEditData.value.username || '',
            }
        });
        watch(() => state.show, (val) => {
            if (!val) {
                setTimeout(() => {
                    emit('update:modelValue', val);
                }, 300);
            }
        });

        const initPowers = () => {
            getPower(addEditData.value.id).then(({ data, res }) => {
                if (data.code == 0) {
                    state.roleIds = data.data.map(c => c.roleid).join(',');
                }
            })
        }
        onMounted(() => { initPowers(); });

        const handleCloseTag = (item) => {
            state.checkeds = state.checkeds.filter(c => c.id != item.id);
            state.roleIds = state.checkeds.map(c => c.id).join(',');
        }
        const handleChoice = (rows) => {
            state.checkeds = rows;
        }
        const handleSubmit = () => {
            state.loading = true;
            setPower(state.form.id, state.roleIds).then(({ data, res }) => {
                state.loading = false;
                if (data.code == 0) {
                    state.show = false;
                    emit('success');
                } else {
                    ElMessageBox.alert(data.msg, { type: 'error' });
                }
            }).catch(() => {
                state.loading = false;
            })
        }

        return {
            ...toRefs(state), handleSubmit, handleChoice, handleCloseTag
        }
    }
}
</script>
<style lang="stylus" scoped>
.el-tag
    margin-right: 1rem;
</style>