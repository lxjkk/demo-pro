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
    path: '/escape-service',
    component: () => import('../views/About.vue'),
    name: 'Indexs',
    meta: { title: '首页', roles: ['user'] }
  },
  {
    path: '/admin/',
    component: Layout,
    name: 'Index',
    meta: { title: '首页', roles: ['admin', 'user'] },
    children: [{
      path: 'tem',
      redirect: '/admin/tem/imserver/',
      component: () => import('@/views/index/temp.vue'),
      meta: { title: '服务管理', roles: ['admin', 'user'] },
      children: [{
        path: '',
        redirect: '/admin/tem/imserver/',
        component: () => import('@/views/index/temp.vue'),
        name: 'tems',
        meta: { title: '即时通讯IM', roles: ['admin', 'user'] },
        children: [
          {
            path: 'imserver/',
            component: () => import('@/views/index/temp.vue'),
            meta: { roles: ['admin'] },
            children: [{
              path: '',
              component: () => import('@/views/index/index.vue'),
              name: 'imservers',
              meta: { roles: ['admin'] }
            }, {
              path: 'details',
              component: () => import('../views/index/details.vue'),
              name: 'Details',
              meta: { title: '详情', roles: ['admin'] }
            }]
          }
        ]
      },
      {
        path: '',
        redirect: '/admin/tem/allsearch/',
        component: () => import('@/views/index/temp.vue'),
        name: 'tems',
        meta: { title: '全文搜索', roles: ['admin', 'user'] },
        children: [
          {
            path: 'allsearch/',
            component: () => import('@/views/index/temp.vue'),
            meta: { roles: ['admin'] },
            children: [{
              path: '',
              component: () => import('../views/allsearch/index.vue'),
              name: 'allsearch',
              meta: { roles: ['admin'] }
            }, {
              path: 'details',
              component: () => import('../views/allsearch/details.vue'),
              name: 'allsearchDetails',
              meta: { title: '详情', roles: ['admin'] }
            }]
          }
        ]
      },
      {
        path: '',
        redirect: '/admin/tem/serviceTcp/',
        component: () => import('@/views/index/temp.vue'),
        name: 'tems',
        meta: { title: '服务协议', roles: ['admin', 'user'] },
        children: [
          {
            path: 'serviceTcp',
            component: () => import('../views/index/temp.vue'),
            meta: { roles: ['admin', 'user'] },
            children: [{
              path: '',
              component: () => import('../views/serviceTcp'),
              name: 'serviceTcps',
              meta: { title: '', roles: ['admin'] }
            }]
          }
        ]
      }
      ]
    }
    ]
  },
  {
    path: '/user/',
    component: Layout,
    name: 'uIndex',
    meta: { title: '首页', roles: ['admin', 'user'] },
    children: [{
      path: 'utem/',
      component: () => import('@/views/main.vue'),
      meta: { title: '扩展服务', roles: ['admin', 'user'] },
      children: [{
        path: '',
        component: () => import('@/views/extend/index.vue'),
        name: 'utem',
        meta: { roles: ['admin', 'user'] }
      },
      // user: im search
      {
        path: 'user-imserver',
        component: () => import('../views/user/imserver.vue'),
        name: 'uImserver',
        meta: { title: '即时通讯IM', roles: ['user'] }
      },
      {
        path: 'user-allsearch',
        component: () => import('../views/user/allsearch.vue'),
        name: 'uAllsearch',
        meta: { title: '全文搜索', roles: ['admin', 'user'] }
      }
      ]
    }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/index/temp.vue'),
    name: '404',
    meta: { roles: ['admin', 'user'] }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 权限通过

export default router
