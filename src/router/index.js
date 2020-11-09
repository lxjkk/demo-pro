// import { Layout } from 'ant-design-vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import store from '@/store'
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
    path: '/',
    component: Layout,
    redirect: '/tem',
    name: 'Index',
    meta: { title: '首页', roles: ['admin', 'user'] },
    children: [{
      path: 'tem',
      redirect: '/',
      component: () => import('@/views/main.vue'),
      meta: { title: '服务管理', roles: ['admin', 'user'] },
      children: [{
        path: '',
        component: () => import('@/views/extend/index.vue'),
        name: 'tems',
        meta: { roles: ['admin', 'user'] }
      },
      {
        path: 'imserver/:id',
        component: () => import('@/views/index/temp.vue'),
        meta: { title: '即时通讯IM', roles: ['admin'] },
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
      },
      {
        path: 'allsearch/:id',
        component: () => import('@/views/index/temp.vue'),
        meta: { title: '全文搜索', roles: ['admin'] },
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
      },
      {
        path: 'serviceTcp',
        component: () => import('../views/index/temp.vue'),
        meta: { title: '服务协议', roles: ['admin', 'user'] },
        children: [{
          path: '',
          component: () => import('../views/serviceTcp'),
          name: 'serviceTcps',
          meta: { title: '', roles: ['admin'] }
        }]
      },
      // user: im search
      {
        path: 'user-imserver',
        component: () => import('../views/index/details.vue'),
        name: 'userDetails',
        meta: { title: '即时通讯IM', roles: ['user'] }
      },
      {
        path: 'user-allsearch',
        component: () => import('../views/allsearch/details.vue'),
        name: 'allsearchDetails',
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

// const routesUser = [
//   {
//     path: '/escape-service',
//     component: () => import('../views/About.vue'),
//     name: 'Indexs',
//     meta: {
//       title: '首页',
//       roles: []
//     }
//   },
//   {
//     path: 'extend-service',
//     component: () => import('../views/extend'),
//     name: 'Extend',
//     meta: { title: '扩展服务' },
//     children: [{
//       path: 'imserver',
//       component: () => import('../views/index/temp.vue'),
//       name: 'imserver',
//       meta: { title: '即时通讯IM' },
//       children: [{
//         path: '',
//         component: () => import('../views/index/index.vue'),
//         name: 'imserver',
//         meta: { title: '' }
//       }, {
//         path: 'details',
//         hidden: true,
//         component: () => import('../views/index/details.vue'),
//         name: 'Details',
//         meta: { title: '详情' }
//       }]
//     },
//     {
//       path: 'allsearch',
//       component: () => import('../views/index/temp.vue'),
//       name: 'allsearch',
//       meta: { title: '全文搜索' },
//       children: [{
//         path: '',
//         component: () => import('../views/allsearch/index.vue'),
//         name: 'allsearch',
//         meta: { title: '' }
//       }, {
//         path: 'details',
//         hidden: true,
//         component: () => import('../views/allsearch/details.vue'),
//         name: 'Details',
//         meta: { title: '详情' }
//       }]
//     },
//     {
//       path: 'serviceTcp',
//       component: () => import('../views/index/temp.vue'),
//       name: 'serviceTcp',
//       meta: { title: '服务协议' },
//       children: [{
//         path: '',
//         component: () => import('../views/serviceTcp'),
//         name: 'serviceTcp',
//         meta: { title: '' }
//       }]
//     }
//     ]
//   }
// ]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 权限通过
router.beforeEach(async (to, from, next) => {
  const storeDate = store.state.is_admin
  if (storeDate === '') {
    next('/404')
  } else {
    console.log(to)
    console.log(storeDate)
    if (storeDate && to.meta.roles.indexOf(storeDate) > -1) {
      next()
    } else {
      next('/404')
    }
  }
})

export default router
