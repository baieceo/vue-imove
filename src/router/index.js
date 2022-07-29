import Vue from 'vue'
import VueRouter from 'vue-router'
import LogicView from '../views/logic/designer/src/pages/index.vue';
import SchemaView from '../views/schema/index.vue';
import DesignerView from '../views/designer/index.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/logic',
    name: 'logic',
    component: LogicView
}, {
    path: '/designer',
    name: 'designer',
    component: DesignerView
}, {
    path: '/schema',
    name: 'schema',
    component: SchemaView
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router