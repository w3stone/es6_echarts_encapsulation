import Vue from 'vue'
import Router from 'vue-router'
import homeIndex from '@/views/home'
import barView from '@/views/barView'
import pieView from '@/views/pieView'
import lineView from '@/views/lineView'
import scatterView from '@/views/scatterView'
import mapView from '@/views/mapView'
import specialView from '@/views/specialView'
import treeView from '@/views/treeView'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: homeIndex,
      children:[
        {
          path:"/bar", 
          component: barView
        },
        {path:"/pie", component: pieView},
        {path:"/line", component: lineView},
        {path:"/scatter", component: scatterView},
        {path:"/map", component: mapView},
        {path:"/special", component: specialView},
        {path:"/tree", component: treeView}
      ]
    }
  ]
})
