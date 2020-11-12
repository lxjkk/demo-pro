import request from '@/utils/request'

// 启用/禁用网站服务
export function getImSiteList (data) {
  console.log(data)
  return request({
    url: '/admin/Im.im/change_website_status',
    method: 'post',
    data: data
  })
}

// 网站充值接口
export function recharge (data) {
  console.log(data)
  return request({
    url: '/admin/im.im/recharge',
    method: 'post',
    data: data
  })
}

// 编辑服务协议
export function editServiceAgreement (data) {
  console.log(data)
  return request({
    url: '/admin/user.service_agreement/edit_service_agreement',
    method: 'post',
    data: data
  })
}
