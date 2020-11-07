<template>
  <div class="main-breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
  <a-config-provider :locale="locale">
    <transition name="fade-transform" mode="out-in">
      <router-view :to="key"></router-view>
    </transition>
    </a-config-provider>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data () {
    return {
      levelList: null,
      // eslint-disable-next-line no-undef
      locale: zhCN
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  },
  watch: {
    $route (route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // const first = matched[0]

      // // if (!this.isDashboard(first)) {
      // //   matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      // // }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    handleLink (item) {
      console.log(item)
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
      }
      this.$router.push(path)
    }
  }
}
</script>

<style>
.main-breadcrumb {
  padding: 0 23px;
  padding-top: 11px;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
