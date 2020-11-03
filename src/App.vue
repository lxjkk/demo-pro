<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#e7e9eb')
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 0 23px;
  padding-top: 11px;
}
</style>
