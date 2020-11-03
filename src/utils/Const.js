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
const YourConsts = {}
YourConsts.install = function (Vue, options) {
  Vue.prototype.$IM_LIST_CONFING_INFO = IM_LIST_CONFING_INFO
  Vue.prototype.$DETAILS_STATUS_CLASS = DETAILS_STATUS_CLASS
  Vue.prototype.$DETAILS_STATUS_TEXT = DETAILS_STATUS_TEXT
}
export default YourConsts
