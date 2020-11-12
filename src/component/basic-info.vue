<template>
  <div class="basics-info l-container">
      <p class="title">基础信息</p>
      <a-row>
        <a-col :span="6" style="margin-bottom: 16px">
          <div class="l-flex-align-center">
            服务状态：
            <div :class="basicsData.status?'lamp-air':'lamp-gray'" />
            <span>{{ basicsData.status?'正常':'停用' }}</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>
            剩余收发量（条）：<span>{{ basicsData.num | toNum }}</span>
          </div>
        </a-col>
        <a-col :span="12" style="margin-bottom: 16px">
          <div>
            开通日期：<span>{{ basicsData.create_time }}</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>网站域名：<a :href="basicsData.url">{{basicsData.url}}</a></div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>联系人：<span>{{basicsData.username}}</span></div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
// import transformTime from '@/utils/transformTime.js'
import toThousands from '@/utils/toThousands.js'
export default {
  props: {
    basicsData: {
      type: Object,
      default: null
    }
  },
  filters: {
    toNum (val) {
      if (val) {
        return toThousands(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.basics-info {
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
