const IM_LIST_CONFING_INFO = [
  {
    value: 1,
    label: '服务状态：'
  },
  {
    value: 2,
    label: '剩余收发量（条）：'
  },
  {
    value: 3,
    label: '开通日期：'
  },
  {
    value: 4,
    label: '网站域名：'
  },
  {
    value: 5,
    label: '联系人:'
  }
]
const DETAILS_STATUS_CLASS = {
  0: 'lamp-off',
  1: 'lamp-on',
  2: 'lamp-air'
}
const DETAILS_STATUS_TEXT = {
  0: '停用',
  1: '正常',
  2: '列队中'
}
const ANEW_UP_STATUS = {
  0: '上传失败',
  1: '上传完成',
  2: '正在上传'
}
const ANEW_UP_STATUS_DESC = {
  0: '网络错误',
  1: '应用接口已经恢复',
  2: '请勿关闭窗口'
}
const USER_TOP_UP_STATUS = {
  0: '返还',
  1: '充值'
}
const EXE_STATUS_OPTIONS = [
  { label: '成功', value: 1 },
  { label: '失败', value: 0 },
  { label: '列队中', value: 2 }
]
const EXE_DEFAULT_LIST = [1, 0, 2]

const EXE_STATUS_OPTIONS_USER = [
  { label: '重置', value: 'inc' },
  { label: '返还', value: 'dec' }
]
const EXE_DEFAULT_LIST_USER = ['inc', 'dec']

const YourConsts = {}
YourConsts.install = function (Vue, options) {
  Vue.prototype.$IM_LIST_CONFING_INFO = IM_LIST_CONFING_INFO
  Vue.prototype.$DETAILS_STATUS_CLASS = DETAILS_STATUS_CLASS
  Vue.prototype.$DETAILS_STATUS_TEXT = DETAILS_STATUS_TEXT
  Vue.prototype.$ANEW_UP_STATUS = ANEW_UP_STATUS
  Vue.prototype.$ANEW_UP_STATUS_DESC = ANEW_UP_STATUS_DESC
  Vue.prototype.$USER_TOP_UP_STATUS = USER_TOP_UP_STATUS
  Vue.prototype.$EXE_STATUS_OPTIONS = EXE_STATUS_OPTIONS
  Vue.prototype.$EXE_DEFAULT_LIST = EXE_DEFAULT_LIST
  Vue.prototype.$EXE_STATUS_OPTIONS_USER = EXE_STATUS_OPTIONS_USER
  Vue.prototype.$EXE_DEFAULT_LIST_USER = EXE_DEFAULT_LIST_USER
}
export default YourConsts
