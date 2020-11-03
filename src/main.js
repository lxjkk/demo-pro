import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './styles/index.less'
import Consts from '@/utils/Const.js'

Vue.use(Consts)
Vue.use(ant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
