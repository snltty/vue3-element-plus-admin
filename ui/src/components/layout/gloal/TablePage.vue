<!--
 * @Author: xr
 * @Date: 2021-04-02 09:11:25
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:08:57
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\layout\gloal\TablePage.vue
-->
<template>
    <el-pagination background layout="total,prev, pager, next" @size-change="onSizePage" @current-change="onChangePage" :total="page.count" :page-size="page.ps" :current-page="page.p">
    </el-pagination>
</template>

<script>
export default {
    props: {
        page: {
            type: Object,
            default: {
                count: 0,
                p: 1,
                ps: 20
            }
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        const onChangePage = (p) => {
            emit('change', p)
        }
        const onSizePage = () => {
            emit('change', 1)
        }
        return {
            onChangePage, onSizePage
        }
    }
}
</script>

<style lang="stylus" scoped></style>