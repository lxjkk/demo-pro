<template>
  <div class="basics-info l-container">
      <p class="title">基础信息</p>
      <a-row>
        <a-col :span="6" style="margin-bottom: 16px">
          <div class="l-flex-align-center">
            服务状态：
            <div class="lamp-air" />
            <span>{{ basicsData?'正常':'停用' }}</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>
            剩余收发量（条）：<span>{{ 10200 | toNum }}</span>
          </div>
        </a-col>
        <a-col :span="12" style="margin-bottom: 16px">
          <div>
            开通日期：<span>{{ 12321321312 | openTime() }}</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>网站域名：<a href="wwww.baidu.com">wwww.baidu.com</a></div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>联系人：<span>11112222333</span></div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import transformTime from '@/utils/transformTime.js'
import toThousands from '@/utils/toThousands.js'
export default {
  props: {
    basicsData: {
      type: Object,
      default: null
    }
  },
  filters: {
    openTime (val) {
      if (val) {
        return transformTime(val)
      }
    },
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
  .lamp-air {
    box-sizing: initial;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #cee2f7;
    background-color: #909399;
    margin-right: 7px;
  }
  }
</style>
