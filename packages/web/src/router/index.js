import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/layout/index.vue';
import LayoutListView from '../views/layout/list.vue';
import LogicListView from '../views/logic/list.vue';
import LogicDesignerView from '../views/logic/designer/src/pages/index.vue';
import ProjectListView from '../views/project/list.vue';
import ProjectDesignerView from '../views/project/designer/index.vue';
import MaterialListView from '../views/material/list.vue';
import SchemaDesignerView from '../views/schema/index.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: LayoutView,
    redirect: '/project/list',
    children: [{
        path: 'project/list',
        component: LayoutListView,
        children: [{
            path: '/',
            name: 'projectList',
            component: ProjectListView
        }]
    }, {
        path: 'project/designer',
        name: 'projectDesigner',
        component: ProjectDesignerView
    }, {
        path: 'material/list',
        component: LayoutListView,
        children: [{
            path: '/',
            component: MaterialListView
        }]
    }, {
        path: 'logic/list',
        component: LayoutListView,
        children: [{
            path: '/',
            component: LogicListView
        }]
    }, {
        path: 'logic/designer',
        name: 'logicDesigner',
        component: LogicDesignerView
    }, {
        path: 'schema/designer',
        component: SchemaDesignerView
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router