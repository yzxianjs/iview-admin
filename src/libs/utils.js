/*
* 业务相关函数
* */
/**
 * 获取views下的页面
 * @param path
 * @returns {Promise<*>|*}
 */
export const importView = (path) => () => import(`@/views${path}`);
/**
 * 加载组件
 * @param path
 * @returns {Promise<*>|*}
 */
export const importComponent = (path) => import(`@/components${path}`);
/**
 * 渲染一个路由挂载
 * @param h
 * @returns {*}
 * @constructor
 */
export const RenderRouterView = (h) => h('router-view');