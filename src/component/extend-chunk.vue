<template>
  <div class="extend-chunk">
    <div class="l-flex-between">
      <span>{{title}}</span>
      <div class="l-flex-allcenter" v-if="open">
        <div :class="status?'lamp-air':'lamp-cloudy'"></div>
        <span>{{status?'正常':'停用'}}</span>
      </div>
    </div>
    <div class="extend-desc" style="margin-bottom: 16px">{{desc}}</div>
    <div v-if="open">
      <div class="extend-desc">{{surplus}}</div>
      <div class="extend-count">{{count | toNum}}</div>
    </div>
    <div v-else class="l-flex-end">
      <a-button type="primary" @click="$emit('open')">开通</a-button>
    </div>
  </div>
</template>

<script>
import toThousands from '@/utils/toThousands.js'

export default {
  props: {
    title: {
      type: String,
      defalue: ''
    },
    status: {
      type: Boolean,
      defalue: false
    },
    desc: {
      type: String,
      defalue: ''
    },
    surplus: {
      type: String,
      defalue: ''
    },
    count: {
      type: Number,
      defalue: 0
    },
    open: {
      type: Boolean,
      defalue: false
    }
  },
  filters: {
    toNum (e) {
      return toThousands(e)
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.extend-chunk {
  width: 23%;
  min-width: 270px;
  background-color: #ffffff;
  padding: 23px;
  margin-top: 19px;
  margin-right: 17px;
  height: 152px;
  border-radius: 1px;
  box-sizing:border-box;
  position: relative;
  &:hover{
    border-radius: 2px;
    box-shadow: 0 0 5px 1px #aaaaac;
    margin-left: 5px;
  }
  .l-flex-end {
    position:absolute;
    bottom: 23px;
    right: 23px;
    box-sizing: border-box;
  }
  .extend-desc {
    font-size: 12px;
    color: #909399;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .extend-count {
    font-size: 24px;
    color: #000000;
    font-weight: 500;
  }
  span {
    font-size: 14px;
    color: #000000;
  }
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

.lamp-cloudy {
  box-sizing: initial;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #eaedf3;
  margin-right: 7px;
}
</style>
