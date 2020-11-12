import request from '@/utils/request'
// 获取站点列表
export function getImSiteList (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/get_im_site_list',
    method: 'get',
    params: params
  })
}

// 导出站点列表
export function saveWebsitExport (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/save_website_export',
    method: 'get',
    params: params
  })
}

// 获取详情列表
export function getImDetailList (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/get_im_detail_list',
    method: 'get',
    params: params
  })
}
// 获取充值列表
export function getRechargeList (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/get_recharge_list',
    method: 'get',
    params: params
  })
}
// 导出私信列表
export function saveDetailListExport (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/save_detail_list_export',
    method: 'get',
    params: params
  })
}
// 导出充值列表
export function saveRechargeExport (params) {
  console.log(params)
  return request({
    url: '/admin/Im.im/save_recharge_export',
    method: 'get',
    params: params
  })
}
// 获取服务协议列表
export function serviceAgreementList (params) {
  console.log(params)
  return request({
    url: '/admin/user.service_agreement/service_agreement_list',
    method: 'get',
    params: params
  })
}
// 获取服务协议详情
export function getServiceAgreement (params) {
  console.log(params)
  return request({
    url: '/admin/user.service_agreement/get_service_agreement',
    method: 'get',
    params: params
  })
}
