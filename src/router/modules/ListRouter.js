const _import = (path) => import(`@/views${path}`);
import {importView, RenderRouterView, importComponent} from '@/libs/utils';
// 列表菜单
const listBase = importView('/List/Base.vue');
const BaseLayout = () => import('@/layouts/baseLayout.vue');

export default [
    {
        path: '/list',
        // redirect: {path: '/list/base'},
        component: BaseLayout,
        name: 'list',
        meta: {
            title: '列表',
        },
        children: [
            {
                path: '/list/base',
                component: listBase,
                name: 'listBase',
                meta: {
                    title: '基本列表',
                },
            },

        ],
    },
];