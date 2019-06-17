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
//Vue.use(VueAxios, axios);
Vue.use(ElementUI, VueAxios, axios);

//获取数据
Vue.prototype.$dataGet = function(apiName, callback){
    let url = "";

    if(apiName.indexOf("http")>-1 || apiName.indexOf("https")>-1){
        url = apiName;
    }else{
        url = "/static/api" + apiName;
    }

    axios.get(url).then((response) => {
        let result = response.data.data;
        if(callback) callback(result);

    }).catch((error)=>{
        console.log(error);
    });
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
