// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
Vue.use(ElementUI, VueAxios, axios);
//Vue.prototype.SuCharts = SuCharts; //引入Charts类

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
