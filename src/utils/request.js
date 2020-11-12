import axios from 'axios'
import { message } from 'ant-design-vue'
// import Qs from 'qs'
let baseUrl = 'https://h5a.opensns.cn/'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://mockjs.com/api'
  console.log('测试环境')
} else {
  baseUrl = 'https://h5a.opensns.cn/'
  console.log('生产环境')
}
const apiServer = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    contentType: 'application/json'

  }
})

apiServer.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

apiServer.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    // console.log(res,'底层返回错误')
    message.info(response)
    const error = new Error(res.msg || 'Error')
    error.res_data = res
    return Promise.reject(error)
  }
  return Promise.resolve(res)
}, err => {
  console.log(err)
  if (err.response && err.response.status === 422) {
    // console.log(err.response.status, '请求格式错误！')
    message.info(err.msg)
    return Promise.reject(err)
  }
})

export default apiServer
