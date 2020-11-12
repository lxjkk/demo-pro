<template>
  <div>
    <a-popover v-model="visiblePopover" trigger="click">
      <div slot="content" style="width: 100px;cursor:pointer" @click="$emit('agreement');visiblePopover=false">服务协议</div>
      <div class="main-popover l-flex-allcenter">···</div>
    </a-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visiblePopover: false
    }
  }
}
</script>

<style scoped>
.main-popover {
  width: 32px;
  height: 32px;
  font-size: 20px;
  background-color: #ffffff;
  cursor: pointer;
}
</style>
