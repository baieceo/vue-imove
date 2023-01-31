import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import draggable from 'vuedraggable';
import Render from '../../materials/i-render/dist';
import EventEmitter from 'eventemitter3';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.component('draggable', draggable);
// 注册组件模板
Vue.component(Render.name, Render);

window.EventEmitter = EventEmitter;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');