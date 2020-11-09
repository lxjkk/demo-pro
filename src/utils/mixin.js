import store from '@/store'

const storeDate = store.state.is_admin
const MyMixin = {}
MyMixin.install = function (Vue, options) {
  Vue.mixin({
    computed: {
      isAdmin () {
        return storeDate === 'admin'
      },
      isUser () {
        return storeDate === 'user'
      }
    }
  })
}

export default MyMixin
