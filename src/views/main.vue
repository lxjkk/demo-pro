<template>
    <router-view></router-view>
</template>

<script>
export default {
  created () {
    if (this.isUser) {
      this.$route.matched[1].meta.title = '扩展服务'
    }
  }
}
</script>
