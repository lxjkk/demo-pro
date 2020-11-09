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
      <keep-alive>
      <router-view :to="key"></router-view>
      </keep-alive>
    </transition>
    </a-config-provider>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import pathToRegexp from 'path-to-regexp'

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
    // 面包屑
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      console.log(this.$route.matched)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      console.log(this.levelList)
    },
    // 将 router :id 转换为正则用于面包屑回退参数消失
    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    // 面包屑跳转
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
      }
      this.$router.push(this.pathCompile(path))
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
