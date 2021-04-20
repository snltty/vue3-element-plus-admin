<!--
 * @Author: xr
 * @Date: 2021-03-31 11:10:14
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 09:55:56
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\config\admin\role\Index.vue
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
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="todo" label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <el-button type="info" size="mini" @click="handleEdit(scope.row)" icon="el-icon-edit"></el-button>
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
</template>

<script>
import { onMounted, provide, reactive, ref, toRefs } from 'vue'
import { getRoles, deleteRole } from '../../../../apis/role'
import Add from './Add'
import { ElMessageBox } from 'element-plus'
export default {
    name: 'Role',
    components: { Add },
    setup () {

        const state = reactive({
            showAdd: false,
            loading: true,
            searchData: {
                'name': { value: '', text: '名称' }
            },
            page: {
                count: 0, ps: 20, p: 1, rows: []
            }
        });

        const searchDom = ref(null);
        const getData = () => {
            state.loading = true;
            getRoles({
                p: state.page.p, ps: state.page.ps, sort: 'id desc', ...searchDom.value.getParams()
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

        const onPageChange = (p) => {
            state.page.p = p;
            getData();
        }

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
        const handleDel = (row) => {
            state.loading = true;
            deleteRole(row.id).then(({ data, res }) => {
                state.loading = false;
                if (data.code == 0) {
                    getData();
                } else {
                    ElMessageBox.alert(data.msg, {
                        type: "error"
                    })
                }
            }).catcg(() => {
                state.loading = false;
            })
        }

        return {
            ...toRefs(state), getData, onPageChange, handleDel, handleAdd, handleEdit, searchDom
        }
    }
}
</script>

<style lang="stylus" scoped></style>