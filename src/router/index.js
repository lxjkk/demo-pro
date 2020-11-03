// import { Layout } from 'ant-design-vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/imserver',
    name: 'Index',
    meta: { title: '首页' },
    children: [{
      path: '',
      redirect: '/imserver',
      component: () => import('../views/index/temp.vue'),
      name: 'tem',
      meta: { title: '服务管理' },
      children: [{
        path: 'imserver',
        component: () => import('../views/index/temp.vue'),
        name: 'imserver',
        meta: { title: '即时通讯IM' },
        children: [{
          path: '',
          component: () => import('../views/index/index.vue'),
          name: 'imserver',
          meta: { title: '' }
        }, {
          path: 'details',
          hidden: true,
          component: () => import('../views/index/details.vue'),
          name: 'Details',
          meta: { title: '详情' }
        }]
      }]
    }]

  },
  {
    path: '/abouts',
    name: 'Abouts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
