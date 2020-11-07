<template>
  <div class="escape-container l-flex">
    <div>
      <img :src="image" />
    </div>
    <div class="info">
      <div class="msg">
        <div class="title">{{title}}</div>
        <div class="title">{{ content }}</div>
      </div>
      <div class="escape">
        <a-checkbox :checked="checked" @change="$emit('update:checked', $event.target.checked)">
          我已阅读并同意
        </a-checkbox>
        <span @click="$emit('escape-privacy', checked)">{{ '《'+ escape + '》' }}</span>
      </div>
      <a-button @click="$emit('grant',checked)">立即开通</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: require('../images/escape-img/escape-service.png')
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    escape: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.escape-container {
  margin-top: 160px;
  color: #000000;
  img {
    width: 100px;
    height: 80px;
  }
  .info {
    margin-left: 22px;
    width: 500px;
    .msg {
      margin-bottom: 24px;
    }
    .title {
      font-size: 20px;
    }
    .escape {
      color: #555658;
      margin-bottom: 24px;
      span {
        color: #1890FF;
        cursor:pointer;
      }
    }
  }
}
</style>
