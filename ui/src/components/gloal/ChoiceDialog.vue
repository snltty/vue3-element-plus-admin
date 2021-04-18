<!--
 * @Author: xr
 * @Date: 2021-04-09 16:04:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:08:00
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\ChoiceDialog.vue
-->
<template>
    <el-dialog :title="title" v-model="show" :width="width" top="1vh" destroy-on-close center>
        <div class="wrap">
            <TableView :head="false">
                <template v-slot:search>
                    <TableSearch ref="searchDom" :data="searchData" @submit="getData"></TableSearch>
                </template>
                <template v-slot:body>
                    <el-table ref="tableDom" v-loading="loading" :data="page.Data" :row-key="key" @selection-change="handleSelectionChange" size="mini" border height='100%' stripe>
                        <template v-if="selection == 'multiple'">
                            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                        </template>
                        <el-table-column :prop="key" :label="key" width="100"></el-table-column>
                        <template v-for="(item,index) in columns" :key="index">
                            <el-table-column :prop="item.name" :label="item.text"></el-table-column>
                        </template>
                        <template v-if="selection == 'single'">
                            <el-table-column prop="todo" label="操作" width="80" fixed="right">
                                <template #default="scope">
                                    <el-button type="success" size="mini" @click.stop="handleChoice(scope.row)">选择</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
                <template v-slot:foot>
                    <TablePage :page="page" @change="onPageChange"></TablePage>
                </template>
            </TableView>
        </div>
        <template #footer v-if="selection == 'multiple'">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
        </template>
    </el-dialog>
    <div @click="handleShow">
        <slot :data="callbackData"></slot>
    </div>
</template>

<script>
import { reactive, toRefs, watch, ref, onMounted, nextTick } from 'vue'
import choiceDialogConfig from './choice-dialog-config'
export default {
    props: {
        modelValue: { type: [String, Number], default: 0 },
        width: { type: String, default: '800px' },
        name: { type: String, default: 'user' },
        columns: { type: Array, default: [] },
        searchData: { type: Object, default: {} },
        title: { type: String, default: '' },
        selection: { type: String, default: 'multiple' }, // single
        defaultSearch: { type: Array, default: [] },
        disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'success'],
    setup (props, { emit }) {
        const { api, columns, searchData, title, key, defaultSearch } = choiceDialogConfig[props.name];
        let defaultValue = props.modelValue;
        const state = reactive({
            show: false,
            columns: props.columns.length > 0 ? props.columns : columns,
            searchData: Object.keys(props.searchData) > 0 ? props.searchData : searchData,
            title: props.title ? props.title : title,
            disabled: props.disabled,
            callbackData: [],
            key: key,
            loading: true,
            page: {
                p: 1,
                ps: 10,
                data: [],
                count: 0
            }
        });
        watch(() => state.show, (val) => {
            if (val) {
                nextTick(() => {
                    getData();
                });
            }
        });

        const tableDom = ref(null);
        const searchDom = ref(null);
        let selections = [];
        const getData = () => {
            state.loading = true;
            let params = [];
            if (defaultValue) {
                params.push({
                    Option: 'AND',
                    FieldName: key,
                    Condition: 'in',
                    Value: defaultValue,
                    Child: []
                });
            } else {
                params = searchDom.value.getParams()
                if (defaultSearch && defaultSearch.length > 0) {
                    params = params.concat(defaultSearch)
                }
                if (props.defaultSearch && props.defaultSearch.length > 0) {
                    params = params.concat(props.defaultSearch)
                }
            }
            console.dir(state.page);
            api(state.page.p, state.page.ps, `${key} DESC`, params).then(({ data, res }) => {
                if (data.code == 0) {
                    state.page = data.data;
                    if (defaultValue && data.data.data.length > 0) {
                        handleUpdateValue(data.data.data);
                    }
                }
                state.loading = false;
            })
        }
        onMounted(() => {
            nextTick(() => {
                if (defaultValue) {
                    getData();
                }
            });
        })


        const onPageChange = (p) => {
            state.page.p = p;
            getData();
        }

        const handleShow = () => {
            if (!state.disabled) {
                defaultValue = 0;
                state.show = true;
            }
        }

        const handleUpdateValue = (rows) => {
            if (props.selection == 'single') {
                emit('update:modelValue', rows[0][key]);
            } else {
                emit('update:modelValue', rows.map(c => c[key]).join(','));
            }
            emit('success', rows);
            state.callbackData = rows;
        }
        const handleChoice = (row) => {
            handleUpdateValue([row]);
            state.show = false;
        }
        const handleSelectionChange = (rows) => {
            selections = rows;
        }
        const handleSubmit = () => {
            handleUpdateValue(selections);
            state.show = false;
        }

        return {
            ...toRefs(state), tableDom, searchDom, getData, onPageChange,
            handleSelectionChange, handleChoice, handleSubmit, handleShow
        }
    }
}
</script>
<style lang="stylus" scoped>
.wrap
    height: 60rem;
</style>