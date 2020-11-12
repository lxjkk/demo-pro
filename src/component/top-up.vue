<template>
  <div>
    <a-modal :title="title" centered :visible="visible" :confirm-loading="confirmLoading" @ok="confirmLoading=true;$emit('ok', data)"
      @cancel="$emit('update:visible', false)">
      <p>
        <a-row class="l-flex-align-center">
          <a-col :span="4" style="text-align: end;padding-right: 10px">
            <label class="">类型</label>
          </a-col>
          <a-col :span="20">
            <a-radio-group v-model="data.type" @change="onRadio">
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
            <a-input-number v-model="data.num" :min="0" style="width: 100%" />
          </a-col>
        </a-row>
      </p>

      <p>
        <a-row class="l-flex-align-center">
          <a-col :span="4" style="text-align: end;padding-right: 10px">
            <label class="">备注</label>
          </a-col>
          <a-col :span="20">
            <a-input v-model="data.remark" placeholder="请输入" />
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
      default: ''
    },
    data: {
      type: Object,
      default () { return {} }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (newval) {
      if (newval === false) {
        this.confirmLoading = false
        this.form = {
          id: null,
          type: 1,
          num: 0,
          remark: ''
        }
      }
    }
  },
  data () {
    return {
      confirmLoading: false,
      form: {
        id: this.data.id,
        type: 1,
        num: 0,
        remark: ''
      }
    }
  },
  methods: {
    onRadio (e) {
      this.data.type = e.target.value
    }
  }
}
</script>

<style>
</style>
