import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import router from './router/index.js';
import store from './store';
import './utils/rem.js'
import './permission.js'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import BaiduMap from 'vue-baidu-map'

import '@/assets/scss/common.scss'
import '@/assets/iconfont/iconfont.css'

Vue.use(Router)

Vue.use(ElementUI);

Vue.use(BaiduMap, { ak: 'rgwrMYXa76E4Q5LQmniDjKI6fZOExHwK' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
