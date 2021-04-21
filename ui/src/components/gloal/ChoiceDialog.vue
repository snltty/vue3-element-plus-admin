<!--
 * @Author: xr
 * @Date: 2021-04-09 16:04:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-21 13:28:34
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\gloal\ChoiceDialog.vue
-->
<template>
    <el-dialog :title="title" v-model="show" :width="width" top="1vh" destroy-on-close center>
        <div class="wrap">
            <TableView :head="false">
                <template v-slot:search>
                    <TableSearch ref="searchDom" :data="searchDataValue" @submit="getData"></TableSearch>
                </template>
                <template v-slot:body>
                    <el-table ref="tableDom" v-loading="loading" :data="page.rows" :row-key="key" @selection-change="handleSelectionChange" size="mini" border height='100%' stripe>
                        <template v-if="selection == 'multiple'">
                            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                        </template>
                        <el-table-column :prop="key" :label="key" width="100"></el-table-column>
                        <template v-for="(item,index) in columnsValue" :key="index">
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
    <slot name="data" :data="callbackData"></slot>
    <span @click="handleShow">
        <slot :data="callbackData"></slot>
    </span>
</template>

<script>
import { reactive, toRefs, watch, ref, onMounted, nextTick } from 'vue'
import choiceDialogConfig from './choice-dialog-config'
export default {
    props: {
        //以下三个常用
        modelValue: { type: [String, Number], default: 0 }, //v-model 值
        name: { type: String, default: 'user' },    //选择name  表示要选择什么  在配置里看都有什么
        selection: { type: String, default: 'multiple' }, // single  选择类型 单选或者多选

        //以下不常用
        width: { type: String, default: '800px' },
        title: { type: String, default: '' },       //标题
        columns: { type: Array, default: [] },  //显示哪些字段

        searchData: { type: Object, default: {} },  //需要哪些搜索
        defaultSearch: { type: Object, default: {} },    //默认搜索

        disabled: { type: Boolean, default: false },    //是否禁用
    },
    emits: ['update:modelValue', 'success'],
    setup (props, { emit }) {
        const { api, columns, searchData, title, key, defaultSearch } = choiceDialogConfig[props.name];
        const state = reactive({
            show: false,
            columnsValue: props.columns.length > 0 ? props.columns : columns,
            searchDataValue: Object.keys(props.searchData) > 0 ? props.searchData : searchData,
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
                })
            }
        });
        watch(() => props.modelValue, (val) => {
            getDefaults(val);
        });

        const tableDom = ref(null);
        const searchDom = ref(null);
        let selections = [];
        const getData = () => {
            state.loading = true;
            let params = searchDom.value.getParams();
            if (defaultSearch && defaultSearch.length > 0) {
                params = Object.assign(params, defaultSearch)
            }
            if (props.defaultSearch) {
                params = Object.assign(props.defaultSearch);
            }
            api({
                p: state.page.p, ps: state.page.ps, sort: `${key} DESC`, ...params
            }).then(({ data, res }) => {
                if (data.code == 0) {
                    state.page = data.data;
                    if (props.selection == 'multiple') {
                        state.callbackData.forEach(c => {
                            tableDom.value.toggleRowSelection(c, true);
                        })
                    }
                }
                state.loading = false;
            })
        }

        const getDefaults = (val) => {
            if (!val) return;
            let params = {
                [key]: val
            }
            api({
                p: 1, ps: 100000, sort: `${key} DESC`, ...params
            }).then(({ data, res }) => {
                if (data.code == 0) {
                    if (data.data.rows.length > 0) {
                        handleUpdateValue(data.data.rows);
                    }
                }
                state.loading = false;
            })
        }
        onMounted(() => {
            getDefaults(props.modelValue);
        })

        const onPageChange = (p) => {
            state.page.p = p;
            getData();
        }

        const handleShow = () => {
            if (!state.disabled) {
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