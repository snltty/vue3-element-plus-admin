/*
 * @Author: xr
 * @Date: 2021-03-20 12:05:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 10:55:55
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import eachs from './eachs/index'

const routes = [
    {
        path: '/login.html',
        name: 'Login',
        component: () => import('../views/login/Index.vue')
    },
    {
        path: '/',
        name: 'Layout',
        redirect: { name: 'Home' },
        component: () => import('../components/layout/Index.vue'),
        children: [
            {
                path: '/default-group.html',
                name: 'Default',
                redirect: { name: 'Home' },
                component: () => import('../components/layout/Group.vue'),
                meta: {
                    name: '默认分组',
                    icon: 'el-icon-connection'
                },
                children: [
                    {
                        path: '/index.html',
                        name: 'Home',
                        component: () => import('../views/default/home/Index.vue'),
                        meta: {
                            name: '首页',
                            ifont: 'iconshouye3'
                        }
                    }
                ]
            },
            {
                path: '/config.html',
                name: 'Config',
                redirect: { name: 'ConfigAdmin' },
                component: () => import('../components/layout/Group.vue'),
                meta: {
                    name: '配置管理',
                    icon: 'el-icon-help'
                },
                children: [
                    {
                        path: '/config-admin.html',
                        name: 'ConfigAdmin',
                        redirect: { name: 'Role' },
                        component: () => import('../components/layout/Group.vue'),
                        meta: {
                            name: '权限管理',
                            icon: 'el-icon-help'
                        },
                        children: [
                            {
                                path: '/role.html',
                                name: 'Role',
                                component: () => import('../views/config/admin/role/Index.vue'),
                                meta: {
                                    name: '角色',
                                    ifont: 'icon-jiaoseguanli'
                                }
                            },
                            {
                                path: '/admin.html',
                                name: 'Admin',
                                component: () => import('../views/config/admin/admin/Index.vue'),
                                meta: {
                                    name: '管理员',
                                    ifont: 'iconjurassic_admin'
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.time('路由守卫时间');
    let isnext = true;
    for (let j in eachs) {
        let funs = eachs[j];
        for (let k in funs) {
            if (!funs[k](to, from, next, router)) {
                isnext = false;
                break;
            }
        }
        if (!isnext) {
            break;
        }
    }
    console.timeEnd('路由守卫时间');
    if (isnext) {
        next();
    }
})

export default router
