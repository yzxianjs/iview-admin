import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import iview from 'iview';
import i18n from './lang/';
import Layout from '@/components/layout/layout.vue';
import BaseLayout from './layouts/baseLayout';
// Element
import ElementUI from 'element-ui';
import './styles/index.scss';


Vue.component('layout', Layout);
Vue.component('BaseLayout', BaseLayout);
Vue.use(ElementUI);
Vue.use(iview);

//  菜单收起文字无法隐藏
import Fragment from 'vue-fragment';

Vue.use(Fragment.Plugin);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
