import Vue from 'vue'
import Router from 'vue-router'
const Question = resolve => require(['../components/question'], resolve)

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Question
    }]
})