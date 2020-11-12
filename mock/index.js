const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 0 // 返回的状态码

// 随机生成文章数据
const postData = req => {
  console.log(req, '哈哈哈') // 请求体，用于获取参数

  const posts = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    const post = {
      id: i,
      site_title: Random.csentence(3, 8), // 名称
      site_order: Random.word(3, 10), // 标题
      site_url: Random.url(), // url
      version: Random.float(0, 1, 1, 2), // 版本
      num: Random.character('number'), // 条数
      status: Random.natural(0, 2) // 状态
    }

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    count: Random.natural(1, 20),
    data: posts
  }
}

const detail = req => {
  console.log(req, 'detail')
  const posts = [] // 用于存放文章数据的数组
  for (let i = 0; i < 10; i++) {
    const post = {
      id: i,
      content: Random.csentence(3, 8), // 名称
      send_name: Random.word(3, 10), // 发送方
      receive_name: Random.url(), // 收取方
      status: Random.natural(0, 2), // 状态
      create_time: Random.datetime() // 时间
    }

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data: {
      list: posts,
      status: Random.natural(0, 2),
      num: Random.natural(1000, 3000),
      create_time: Random.datetime(),
      count: Random.natural(1, 100),
      url: Random.url(),
      username: Random.csentence(3, 8)
    }
  }
}

const pay = req => {
  console.log(req, 'pay')
  const posts = [] // 用于存放文章数据的数组
  for (let i = 0; i < 10; i++) {
    const post = {
      id: i,
      num: Random.csentence(3, 8), // 充值数量
      start_num: Random.word(3, 10), // 充值前
      end_num: Random.url(), // 充值后
      status: Random.natural(0, 1), // 状态
      create_time: Random.datetime() // 时间
    }

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data: {
      list: posts,
      status: Random.natural(0, 2),
      num: Random.natural(1000, 3000),
      create_time: Random.datetime(),
      count: Random.natural(1, 20),
      url: Random.url(),
      username: Random.csentence(3, 8)
    }
  }
}
// 充值
const recharge = req => {
  console.log(req, 'recharge')

  // 返回状态码和文章数据posts
  const redom = Random.natural(0, 1)
  return {
    code,
    msg: redom ? 'ok' : 'fail',
    data: redom ? '充值成功' : '充值失败',
    count: 0
  }
}

// 启用/禁用网站服务
const websiteStatus = req => {
  console.log(JSON.parse(req.body), 'websiteStatus')

  const redom = Random.natural(0, 1)
  return {
    code,
    msg: redom ? 'ok' : 'fail',
    data: redom ? '网站服务启用成功' : '网站服务已启用',
    count: 0
  }
}
// 获取服务协议l列表
const service = req => {
  console.log(req, 'service') // 请求体，用于获取参数

  const posts = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    const post = {
      id: i,
      name: Random.csentence(3, 8), // 名称
      service_name: Random.word(3, 10), // 标题
      update_time: Random.datetime(), // 条数
      status: Random.natural(0, 2) // 状态
    }

    posts.push(post)
  }

  return {
    code,
    count: Random.natural(1, 20),
    data: posts
  }
}
// 获取服务协议详情
const detailS = req => {
  console.log(req, 'detailS')

  return {
    code,
    data: {
      service_name: Random.csentence(3, 7),
      name: Random.csentence(8, 20),
      content: Random.csentence(300, 1000)
    }
  }
}

// 编辑服务协议
const edit = req => {
  console.log(req, 'edit')

  const redom = Random.natural(0, 1)
  return {
    code,
    msg: redom ? 'ok' : 'fail',
    data: redom ? '编辑成功' : '编辑失败',
    count: 0
  }
}

// 定义请求链接，类型，还有返回数据
function isP (url) {
  return RegExp(`${domain}${url}.*`)
}
Mock.mock(isP('/admin/Im.im/get_im_site_list'), 'get', postData)

// 导出数据
Mock.mock(isP('/admin/Im.im/save_website_export'), 'get', { code: code, data: '导出数据' })
Mock.mock(isP('/admin/Im.im/save_website_export'), 'get', { code: code, data: '导出数据' })
Mock.mock(isP('/admin/Im.im/save_website_export'), 'get', { code: code, data: '导出数据' })

Mock.mock(isP('/admin/Im.im/get_im_detail_list'), 'get', detail)
Mock.mock(isP('/admin/Im.im/get_recharge_list'), 'get', pay)
Mock.mock(`${domain}/admin/im.im/recharge`, 'post', recharge)
Mock.mock(`${domain}/admin/Im.im/change_website_status`, 'post', websiteStatus)
Mock.mock(isP('/admin/user.service_agreement/service_agreement_list'), 'get', service)
Mock.mock(isP('/admin/user.service_agreement/get_service_agreement'), 'get', detailS)
Mock.mock(isP('/admin/user.service_agreement/edit_service_agreement'), 'post', edit)
