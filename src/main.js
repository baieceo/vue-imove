import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import draggable from 'vuedraggable';
import ComponentTemplate from './components/component-template';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.component('draggable', draggable);
// 注册组件模板
Vue.component(ComponentTemplate.name, ComponentTemplate);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');