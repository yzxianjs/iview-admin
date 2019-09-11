import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
    en: Object.assign({message: 'hello'}, en),
    zh: Object.assign({message: '你好'}, zh),
};

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'zh',  // set locale
    messages,  // set locale messages
});


export default i18n;