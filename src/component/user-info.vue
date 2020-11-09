<template>
  <div class="l-container user-info">
    <p class="title">基础信息</p>
    <a-row>
      <a-col :span="6" style="margin-bottom: 16px">
        <div class="l-flex-align-center">
          服务状态：
          <div :class="status?'lamp-air':'lamp-gray'" />
          <span>{{ status?'正常':'停用' }}</span>
        </div>
      </a-col>
      <a-col :span="6" style="margin-bottom: 16px">
        <div>
          剩余收发量（条）：<span>{{ strip | toNum }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <div>
          开通日期：<span>{{ dateTime | toDate }}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import toThousands from '@/utils/toThousands.js'
import transformTime from '@/utils/transformTime.js'

export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    strip: {
      type: Number,
      default: 0
    },
    dateTime: {
      type: Number,
      default: 0
    }
  },
  filters: {
    toNum (val) {
      return toThousands(val)
    },
    toDate (val) {
      return transformTime(val)
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  height: 148px;
  span {
    color: #555658;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
  }

  .lamp-air {
    box-sizing: initial;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #cee2f7;
    color: #40a9ff;
    background-color: #1890ff;
    margin-right: 7px;
  }
  .lamp-gray {
    box-sizing: initial;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #c8d3df;
    background-color: #909399;
    margin-right: 7px;
  }
}
</style>
