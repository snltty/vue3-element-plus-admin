<!--
 * @Author: xr
 * @Date: 2021-03-21 20:45:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 16:06:10
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\views\login\Index.vue
-->
<template>
    <div class="bg-wrap absolute">
        <div class="wrap">
            <div class="tabs flex">
                <a href="javascript:;" :class="{current:activeName == 'password'}">密码登录</a>
            </div>
            <div class="inner">
                <div class="header t-c"><img src="../../assets/logo.svg" alt=""></div>
                <div class="body">
                    <template v-if="activeName == 'password'">
                        <Password @success="onSuccess"></Password>
                    </template>
                </div>
            </div>
            <div class="foot t-c">少年郎秃头呀</div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import Password from './Password'
import { useRouter } from 'vue-router'
import { myMapActions } from '../../libs/store/index'

export default {
    components: { Password },
    setup () {
        const activeName = ref('password');
        const router = useRouter();
        const { setToken, setLoginInfo } = myMapActions('login', ['setToken', 'setLoginInfo']);

        const onSuccess = (data) => {
            //保存token什么的,然后跳转到首页 
            setLoginInfo({
                user: data.data.admin
            });
            setToken(data.data.token);
            router.push('/');
        }

        return {
            activeName, onSuccess
        }
    }
}
</script>
<style lang="stylus" scoped>
.bg-wrap
    background-color: #fff;
    background-image: url('/images/login-bg.jpg');
    background-size: cover;
    z-index: 1;
    position: fixed;

.wrap
    width: 40rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);

    .inner
        box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
        padding: 5rem 6rem 3rem 6rem;
        background-color: #fff;
        border-radius: 0 0.2rem 0.2rem 0.2rem;

    .tabs
        position: absolute;
        left: 0;
        bottom: calc(100% - 0.1rem);
        right: 0;

        a
            background-color: #fff;
            border-radius: 0.2rem 0.2rem 0 0;
            padding: 0.6rem 2rem;
            // width: 50%;
            color: #333;

            &.current
                color: var(--main-color);

    .header
        margin-bottom: 3rem;

        img
            height: 6rem;

    .foot
        color: rgba(255, 255, 255, 0.6);
</style>