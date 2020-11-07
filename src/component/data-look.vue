<template>
  <div class="container" :class="active?'active':''">
    <div>{{title}}</div>
    <div class="count">{{count | toNum}}</div>
    <div class="isWeek" v-if="isWeek">同上周<span :class="isRate?'on':'off'">{{ rate+'%'}}</span></div>
  </div>
</template>

<script>
import toThousands from '@/utils/toThousands.js'
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: null
    },
    rate: {
      type: Number,
      default: 0
    },
    isRate: {
      type: Boolean,
      default: false
    },
    isWeek: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    toNum (val) {
      return toThousands(val)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 20%;
  height: 90px;
  font-size: 14px;
  position: relative;
  .count {
    font-size: 30px;
    font-weight: 500;
  }
  .isWeek {
    position: absolute;
    bottom: 0;
    font-size: 12px;
    color: #8c8c8c;
    span {
      margin-left: 3px;
    }
    .on {
      color: #39c15b;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: -12px;
        border: 4px solid;
        border-color: transparent transparent #39c15b;
      }
    }
    .off {
      color: #f5222d;
      &::after {
        content: '';
        position: absolute;
        top: 6px;
        right: -12px;
        border: 4px solid;
        border-color: transparent transparent #f5222d;
        transform: rotate(180deg);
      }
    }
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    border-right: 1px solid #f0f0f0;
  }
}
.active {
  &::after {
    content: '';
    display: none;
  }
}
</style>
