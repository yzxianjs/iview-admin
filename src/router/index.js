import Vue from 'vue';
import Router from 'vue-router';
import UserRouter from './modules/UserRouter';
import MenuRouter from './modules/MenuRouter';
import ListRouter from './modules/ListRouter';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            // redirect: {path: '/manager'},
            component: () => import('@/layouts/baseLayout.vue'),
            meta: {
                title: '首页',
                icon: 'el-icon-edit',
            },
        },
        {
            path: '/test',
            component: () => import('@/components/test.vue'),
        },
        ...MenuRouter,
        ...UserRouter,
        ...ListRouter,
    ],
});
router.beforeEach((to, form, next) => {
    next();
});
export default router;
/*
* 路由懒加载

const login = r => require.ensure([], () => r(require('@/views/auth/login')), 'login'); //登录
const register = r => require.ensure([], () => r(require('@/views/auth/register')), 'register'); //注册
export default new Router({
  routes: [
		{path: '/home ',name: 'home ',component: home ,meta: {title: 'home',requireAuth:true}},
		{path: '/about ',name: 'about ',component: about ,meta: {title: '关于',requireAuth:true}},
  ]
})


* */