import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
        path: '/',
        name: 'homeIndex',
        component: (resolve)=> require(['@/views/home.vue'], resolve),
        children:[
            {
                path:"/bar", 
                component: (resolve)=> require(['@/views/barView.vue'], resolve)
            },
            {
                path:"/pie", 
                component: (resolve)=> require(['@/views/pieView.vue'], resolve)
            },
            {
                path:"/line", 
                component: (resolve)=> require(['@/views/lineView.vue'], resolve)
            },
            {
                path:"/scatter", 
                component: (resolve)=> require(['@/views/scatterView.vue'], resolve)
            },
            {
                path:"/map", 
                component: (resolve)=> require(['@/views/mapView.vue'], resolve)
            },
            {
                path:"/special", 
                component: (resolve)=> require(['@/views/specialView.vue'], resolve)
            },
            {
                path:"/tree", 
                component: (resolve)=> require(['@/views/treeView.vue'], resolve)
            }
        ]
    }
  ]
})
