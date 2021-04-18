<!--
 * @Author: xr
 * @Date: 2021-03-31 11:10:14
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 10:46:26
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
            <el-table v-loading="loading" :data="page.Data" size="mini" border height='100%' stripe>
                <el-table-column prop="ID" label="编号" width="100"></el-table-column>
                <el-table-column prop="Name" label="名称" width="100"></el-table-column>
                <el-table-column prop="LoginName" label="登录名" width="140"></el-table-column>
                <el-table-column prop="Phone" label="手机" width="140"></el-table-column>
                <el-table-column prop="WeiXin" label="微信"></el-table-column>
                <el-table-column prop="todo" label="操作" width="330" fixed="right">
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
    <WxNotify v-if="showWxNotify" v-model="showWxNotify"></WxNotify>
</template>

<script>
import { onMounted, provide, reactive, ref, toRefs } from 'vue'
import Add from './Add'
import SetRoles from './SetRoles'
export default {
    name: 'Admin',
    components: { Add, SetRoles },
    setup () {

        const state = reactive({
            showAdd: false,
            showSetRoles: false,
            loading: true,
            searchData: {
                'Name': { value: '', text: '名称', condition: 'like' },
                'LoginName': { value: '', text: '登录名', condition: 'like' },
                'Phone': { value: '', text: '手机', condition: 'like' },
            },
            page: {
                Count: 0, PageSize: 20, PageIndex: 1, Data: []
            }
        });
        const onPageChange = (p) => {
            state.page.PageIndex = p;
            getData();
        }

        const searchDom = ref(null);
        const getData = () => {
            state.loading = true;
            let params = searchDom.value.getParams();
        }
        onMounted(() => { getData(); });

        const handleDel = (row) => {
            state.loading = true;
        }

        const addEditData = ref({ ID: 0 });
        provide('add-edit-data', addEditData)
        const handleAdd = () => {
            addEditData.value = { ID: 0 };
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

        return {
            ...toRefs(state), getData, onPageChange, searchDom,
            handleDel, handleAdd, handleEdit, handleSetRoles, handleWxNotify
        }
    }
}
</script>

<style lang="stylus" scoped></style>