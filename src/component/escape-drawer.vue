<template>
  <div>
    <a-drawer width="640" class="drawer" placement="right" :closable="false" :visible="visibleDrawer"
      @close="$emit('update:visibleDrawer', false)">
      <div class="title l-flex-between">
        <span>{{ title }}</span>
        <a-icon type="close" style="cursor:pointer;" @click="$emit('update:visibleDrawer', false)" />
      </div>
      <a-divider />

      <div class="article">
          {{content}}
      </div>

      <div style="">
        <a-divider />
        <div style="text-align: end;">
        <a-space v-if="escapeType">
            <a-button @click="$emit('update:visibleDrawer', false)">取消</a-button>
          <a-button type="primary" @click="$emit('consent', true)">同意</a-button>
        </a-space>
        <a-button v-else type="primary" @click="$emit('update:visibleDrawer', false)">取消</a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    visibleDrawer: {
      type: Boolean,
      default: false
    },
    escapeType: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.drawer {
  font-size: 14px;
  font-size: 500;
  color: #000000;
  .title {
    font-size: 16px;
    font-size: 500;
  }
  .input-m {
    margin-bottom: 24px;
  }
  .article {
    color: #595959;
    height: 765px;
    overflow-y:auto;
  }
}
</style>
