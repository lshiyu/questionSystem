// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from "iview"
import 'iview/dist/styles/iview.css'
import axios from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
Vue.config.productionTip = false
Vue.use(iView)
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8"
axios.defaults.baseURL = "http://127.0.0.1:3000"
axios.interceptors.request.use(config => {
    NProgress.start();
    return config;
}, err => {
    return Promise.reject(err)
});
axios.interceptors.response.use(response => {
        NProgress.done();
        return response;
    })
    // Vue.use(axios)
Vue.prototype.$http = axios;
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
})
router.afterEach(transition => {
        NProgress.done();
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})