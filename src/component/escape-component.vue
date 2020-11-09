<template>
  <div class="escape-container l-flex">
    <div class="escape-image">
      <img :src="image | images" />
    </div>
    <div class="info">
      <div class="msg">
        <div class="title">{{title}}</div>
        <div class="title">{{ content }}</div>
      </div>
      <a-alert :message="userDesc" v-if="userDesc" type="info" show-icon style="margin-bottom:32px"/>
      <div class="escape">
        <a-checkbox :checked="checked" @change="$emit('update:checked', $event.target.checked)">
          我已阅读并同意
        </a-checkbox>
        <span @click="$emit('escape-privacy', checked)">{{ '《'+ escape + '》' }}</span>
      </div>
      <a-button :disabled="!checked" @click="$emit('grant',checked)">立即开通</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Number,
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
    },
    userDesc: {
      type: String,
      default: null
    }
  },
  filters: {
    images (val) {
      if (!val) {
        return require('../images/escape-img/escape-service.png')
      }
      const obj = {
        0: require('../images/escape-img/escape-service.png'),
        1: require('../images/escape-img/IM-forthwith.png'),
        2: require('../images/escape-img/all-search.png')
      }
      return obj[val]
    }
  }
}
</script>

<style lang="less" scoped>
.escape-container {
  margin-top: 160px;
  color: #000000;
  .escape-image {

  }
  img {
    max-width: 100px;
    max-height: 95px;
  }
  .info {
    margin-left: 22px;
    width: 510px;
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
