<!--
 * @Author: xr
 * @Date: 2021-03-31 11:10:14
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:19:53
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\admin\Index.vue
-->
<template>
    <TableView>
        <template v-slot:search>
            <TableSearch ref="searchDom" :data="searchData" @submit="getData"></TableSearch>
        </template>
        <template v-slot:head>
            <el-button type="primary" size="mini" @click="handleAdd" icon="el-icon-circle-plus">添加</el-button>
        </template>
        <template v-slot:body>
            <el-table v-loading="loading" :data="page.rows" size="mini" border height='100%' stripe>
                <el-table-column prop="id" label="编号" width="100"></el-table-column>
                <el-table-column prop="username" label="名称"></el-table-column>
                <el-table-column prop="avatar" label="头像">
                    <template #default="scope">
                        <ImagePlay :imgs="scope.row.avatar"></ImagePlay>
                    </template>
                </el-table-column>
                <el-table-column prop="todo" label="操作" width="210" fixed="right">
                    <template #default="scope">
                        <el-button type="info" size="mini" @click="handleEdit(scope.row)" icon="el-icon-edit"></el-button>
                        <el-button type="primary" size="mini" @click="handleSetRoles(scope.row)">分配角色</el-button>
                        <el-popconfirm title="删除不可逆，是否确认" @confirm="handleDel(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-slot:foot>
            <TablePage :page="page" @change="onPageChange"></TablePage>
        </template>
    </TableView>
    <Add v-if="showAdd" v-model="showAdd" @success="getData"></Add>
    <SetRoles v-if="showSetRoles" v-model="showSetRoles"></SetRoles>
</template>

<script>
import { onMounted, provide, reactive, ref, toRefs } from 'vue'
import Add from './Add'
import SetRoles from './SetRoles'
import { getAdmins, deleteAdmin } from '../../../../apis/admin'
import { ElMessageBox } from 'element-plus'
export default {
    name: 'Admin',
    components: { Add, SetRoles },
    setup () {

        const state = reactive({
            showAdd: false,
            showSetRoles: false,
            loading: true,
            searchData: {
                'username': { value: '', text: '名称' }
            },
            page: {
                count: 0, ps: 20, p: 1, rows: []
            }
        });
        const onPageChange = (p) => {
            state.page.p = p;
            getData();
        }

        const searchDom = ref(null);
        const getData = () => {
            state.loading = true;
            let params = searchDom.value.getParams();
            getAdmins({
                p: state.page.p, ps: state.page.ps, sort: 'id desc', ...params
            }).then(({ data, res }) => {
                state.loading = false;
                if (data.code == 0) {
                    state.page = data.data;
                }
            }).catch(() => {
                state.loading = false;
            })
        }
        onMounted(() => { getData(); });

        //新增修改删除
        const addEditData = ref({ id: 0 });
        provide('add-edit-data', addEditData)
        const handleAdd = () => {
            addEditData.value = { id: 0 };
            state.showAdd = true;
        }
        const handleEdit = (row) => {
            addEditData.value = row;
            state.showAdd = true;
        }
        const handleSetRoles = (row) => {
            addEditData.value = row;
            state.showSetRoles = true;
        }
        const handleDel = (row) => {
            state.loading = true;
            deleteAdmin(row.id).then(({ data, res }) => {
                state.loading = false;
                if (data.code == 0) {
                    getData(0)
                } else {
                    ElMessageBox.alert(data.msg, {
                        type: 'error'
                    });
                }
            });
        }

        return {
            ...toRefs(state), getData, onPageChange, searchDom,
            handleDel, handleAdd, handleEdit, handleSetRoles
        }
    }
}
</script>

<style lang="stylus" scoped></style>