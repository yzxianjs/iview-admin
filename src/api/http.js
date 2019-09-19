import axios from 'axios';

let baseURL = `https://easy-mock.com/mock/5b962af7e0d1a17c279c8870/iview`;

class AjaxRequest{
    constructor(){
        this.baseURL = process.env.NODE_ENV == 'production' ? '/' : baseURL;
        this.timeout = 5000;//超时处理
        this.headers = { 'X-Custom-Header' : 'foobar' };
        this.queue = {};//存放每次的请求
    }

    merge(options){
        return {
            ...options,
            baseURL : this.baseURL,
            timeout : this.timeout,
            headers : this.headers,
        };
    }

    /**
     * 添加响应拦截器
     * @param instance axios实例
     */
    setInterceptor(instance, url){

        // 添加请求拦截器:常做的处理有开始加载loading
        instance.interceptors.request.use((config) => {
            // config.headers.Authorization = 'xxxx';//自己设置

            if(Object.keys(this.queue).length === 0){
                //store.commit("showLoading");
            }
            this.queue[ url ] = url;

            // 在发送请求之前做些什么
            return config;
        }, function(error){
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        //需要拦截器:loading加载完成隐藏loading进度条
        instance.interceptors.response.use((response) => {

            //隐藏加载的进度条
            if(Object.keys(this.queue).length === 0){
                //store.commit("hideLoading");
            }
            delete this.queue[ url ];
            // 对响应数据做点什么
            return response;
        }, function(error){
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    request(options){
        let instance = axios.create();
        //拦截器
        this.setInterceptor(instance);
        let config = this.merge(options, options.url);

        return instance(config);//返回的是一个Promise
    }
}

export default new AjaxRequest;
