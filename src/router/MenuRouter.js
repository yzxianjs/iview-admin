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
    },
    {
        path: '/manager',
        component: Manager,
    },
    {
        path: '/app',
        component: App,
    },
    {
        path: '/push',
        component: Push,
    },
];