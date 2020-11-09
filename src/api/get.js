import request from '@/utils/request'
export function getImSiteList (params) {
  console.log(params)
  return request({
    url: '/admin/im.im/get_im_site_list.html',
    method: 'get',
    params: params
  })
}
