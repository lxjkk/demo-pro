<template>
  <div>
    <a-modal centered closable :maskClosable="false" :keyboard="false" :visible="visible" @ok="handleOk"
      @cancel="$emit('update:visible', false)" footer="">
      <p class="status">{{ $ANEW_UP_STATUS[data.status] }}</p>
      <a-progress :percent="50" :status="data.status? 'active':'exception'" style="margin-bottom:10px" />
      <span>{{$ANEW_UP_STATUS_DESC[data.status]}}</span>
      <div style="text-align: end">

        <div v-if="!data.status">
          <a-space>
            <a-button @click="$emit('update:visible', false)">稍后重试</a-button>
            <a-button type="primary" @click="$emit('anew-up', {id: '9910'})">重新上传</a-button>
          </a-space>
        </div>
        <a-button v-else type="primary" @click="$emit('update:visible', false)">完成</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default () { return { status: 0 } }
    }
  },
  methods: {
    handleOk () {
      console.log('确定')
    }
  }
}
</script>

<style lang="less" scoped>
.status {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 16px;
}
</style>
