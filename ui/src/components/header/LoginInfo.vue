<!--
 * @Author: xr
 * @Date: 2021-03-20 13:38:24
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:24:44
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\header\LoginInfo.vue
-->
<template>
    <div class="wrap">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img class="avatar" v-if="loginInfo.user.avatar" :src="loginInfo.user.avatar.addHost()[0]" />
                <img class="avatar" v-else src="../../assets/logo.svg" />
                <span class="name">
                    {{loginInfo.user.nicname || loginInfo.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
import { computed } from 'vue';
import { myMapActions, myMapStates } from '../../libs/store/index'
export default {
    setup () {
        const { loginInfo } = myMapStates('login', {
            loginInfo: (state) => computed(() => state.loginInfo)
        });
        const { logout } = myMapActions('login', ['logout'])
        const { clear } = myMapActions('menu', ['clear'])

        const handleLogout = () => {
            logout();
            clear();
            window.location.reload();
        }

        return {
            loginInfo, handleLogout
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap
    padding: 0 2rem;
    height: var(--header-height);
    line-height: var(--header-height);

.name
    color: rgba(255, 255, 255, 0.8);

.avatar
    vertical-align: middle;
    border-radius: 50%;
    height: 3rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    background-color: #f5f5f5;
    margin-right: 0.6rem;
</style>