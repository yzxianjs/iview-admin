import Cookies from 'js-cookie';

const state = {
    a: 100,
    // 默认打开侧边栏
    sideBarStatus: Cookies.get('sideBarStatus') ? !!+Cookies.get('sideBarStatus') : true,
    device: 'desktop',
};
const mutations = {
    toggleSideBar(state) {
        state.sideBarStatus = !state.sideBarStatus;
        if (state.sideBarStatus) {
            Cookies.set('sideBarStatus', 1);
        } else {
            Cookies.set('sideBarStatus', 0);
        }
    },
    closeSideBar(state) {
        state.sideBarStatus = false;
        Cookies.set('sideBarStatus', 0);
    },
};
const actions = {
    toggleSideBar({commit}) {
        commit('toggleSideBar');
    },
    closeSideBar({commit}) {
        commit('closeSideBar');
    },

};
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
