import axios from 'axios'
import { message } from 'ant-design-vue'
// import Qs from 'qs'
const baseUrl = 'https://h5a.opensns.cn/admin/'
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = 'http://localhost:8081/api'
//   console.log('测试环境')
// } else {
//   baseUrl = 'http://www.lxjkk.icu:3000/api'
//   console.log('生产环境')
// }
const apiServer = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
  jsonp: 'handleCallback',
  headers: {
    Accept: 'application/json'
  }
})

apiServer.interceptors.request.use(config => {
  config.headers.cookies = 'PHPSESSID=1qn0ti0tvb6g8102j9ul0h110k'
  return config
}, err => {
  localStorage.removeItem('token')
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
