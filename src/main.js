// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'
import $ from 'jquery'
//import {SuCharts} from '@/components/charts/suCharts.js'

//import './assets/css/bootstrap.min.css' 
//import './assets/css/iconfont.css'
//import './assets/scripts/bootstrap.min.js' 

Vue.config.productionTip = false;
Vue.use(ElementUI, VueAxios, axios);
//Vue.prototype.SuCharts = SuCharts; //引入Charts类

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
