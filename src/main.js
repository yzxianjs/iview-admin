import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import i18n from './lang/';
import Layout from '@/components/layout/layout.vue';
// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss';

Vue.component('layout', Layout);
Vue.use(ElementUI);
Vue.use(iview);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
