import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        db:{
            url:"www.db.com",
            name:"",
            port:"",
            database:"",
            username:"",
            pass:""
        },
        target:{
            url:"www.target.com"
        },
        standard:{
            url:"www.standard.com"
        },
        vIndex: 0 //垂直时间轴被点击的索引
    },
    getters:{
        dbUrl: state =>{
            return state.db.url;
        },
        targetUrl: state =>{
            return state.target.url;
        },
        standardUrl: state =>{
            return state.standard.url;
        }
    },
    mutations: {
        //改变垂直时间轴索引
        changeVindex (state, index) {
            state.vIndex = index;
        }
    }

});

export default store