const _import = (path) => import(`@/views${path}`);
import {importView, RenderRouterView, importComponent} from '../../libs/utils';
//用户注册/登录
const Login = importView('/User/Login.vue');
const Register = importView('/User/Register');
export default [
    {
        path: '/user',
        component: () => import('@/layouts/UserLayout/UserLayout.vue'),
        redirect: {path: '/user/login'},
        children: [
            {
                path: '/user/login',
                name: 'login',
                component: Login,
            },
            {
                path: '/user/register',
                name: 'register',
                component: Register,
            },
        ],
    },
];