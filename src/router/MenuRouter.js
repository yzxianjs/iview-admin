const _import = (path) => import(`@/views${path}`);
import {importView, RenderRouterView, importComponent} from '../libs/utils';
//用户注册/登录
const Dev = importView('/dev.vue');
const Manager = importView('/manager.vue');
const Push = importView('/push.vue');
const App = importView('/app.vue');
export default [
    {
        path: '/dev',
        component: Dev,
        meta: {
            title: '开发管理',
        },
    },
    {
        path: '/manager',
        component: Manager,
        meta: {
            title: '个人中心',
        },
    },
    {
        path: '/app',
        component: App,
        meta: {
            title: '应用中心',
        },
        children: [
            {
                path: '/app/son',
                component: () => import('@/views/son.vue'),
                meta: {
                    title: 'JAVA开发',
                },
            },
        ],
    },

];