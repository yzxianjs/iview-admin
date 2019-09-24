const _import = (path) => import(`@/views${path}`);
import {importView, RenderRouterView, importComponent} from '@/libs/utils';

const BaseLayout = () => import('@/layouts/baseLayout.vue');

// 菜单管理
const manager = importView('/Manager/manager.vue');

//列表
const menuList = importView('/Manager/menu/menuList.vue');
//添加菜单
const menuAdd = importView('/Manager/menu/menuAdd.vue');

const menuRouter = [
    {
        path: '/menuList',
        component: menuList,
        meta: {
            title: '查看菜单列表',
        },
    },
    {
        path: '/menuAdd',
        component: menuAdd,
        meta: {
            title: '添加菜单管理',
        },
    },
];

//manager/menuManager
export default [
    {
        path: '/manager',
        // redirect: {path: '/'},
        component: BaseLayout,
        meta: {
            title: '管理中心',
        },
        children: [
            {
                path: '/manager/menuManager',
                meta: {
                    title: '菜单管理',
                },
                component: menuList,
            },
        ],
    },
];