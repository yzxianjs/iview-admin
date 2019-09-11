import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import i18n from './lang/';

Vue.use(iview);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
