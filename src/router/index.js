import Vue from 'vue'
import VueRouter from 'vue-router'
import LogicView from '../views/logic/designer/src/pages/index.vue';
import DesignerView from '../views/designer/index.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'logic',
    component: LogicView
}, {
    path: '/designer',
    name: 'designer',
    component: DesignerView
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router