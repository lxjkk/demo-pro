<template>
  <div>
    <a-modal :title="title" centered :visible="visible" confirm-loading @ok="$emit('ok', form)"
      @cancel="$emit('update:visible', false)">
      <p>
        <a-row class="l-flex-align-center">
          <a-col :span="4" style="text-align: end;padding-right: 10px">
            <label class="">类型</label>
          </a-col>
          <a-col :span="20">

            <a-radio-group v-model="form.type" @change="onRadio">
              <a-radio :value="1">
                充值
              </a-radio>
              <a-radio :value="2">
                返还
              </a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </p>

      <p>
        <a-row class="l-flex-align-center">
          <a-col :span="4" style="text-align: end;padding-right: 10px">
            <label class="">充值数量</label>
          </a-col>
          <a-col :span="20">
            <a-input-number v-model="form.num" :min="0" style="width: 100%" />
          </a-col>
        </a-row>
      </p>

      <p>
        <a-row class="l-flex-align-center">
          <a-col :span="4" style="text-align: end;padding-right: 10px">
            <label class="">备注</label>
          </a-col>
          <a-col :span="20">
            <a-input v-model="form.desc" placeholder="请输入" />
          </a-col>
        </a-row>
      </p>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    visible (newval) {
      if (!newval) {
        this.form = {
          type: 1,
          num: 0,
          desc: '无'
        }
      }
    }
  },
  data () {
    return {
      form: {
        type: 1,
        num: 0,
        desc: '无'
      }
    }
  },
  methods: {
    onRadio (e) {
      this.form.type = e.target.value
    }
  }
}
</script>

<style>
</style>
