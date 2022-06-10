import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    name: '主页',
    component: () => import('../views/onemap.vue')
  }
]

const routes = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default routes
