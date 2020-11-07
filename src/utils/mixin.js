import store from '@/store'

const isValue = store.status.is_admin
const MyMixin = {}
MyMixin.install = function (Vue, options) {
  Vue.mixin({
    computed: {
      isAdmin () {
        return isValue === 'admin'
      },
      isUser () {
        return isValue === 'user'
      }
    }
  })
}

export default MyMixin
