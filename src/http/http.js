import axios from 'axios'
import conf from './config.js'
import router from '@/router'

const http = axios.create(conf)

// 请求拦截器
http.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(response => {
  // response 的 status 为200, 则表明成功访问接口
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
},
error => {
  console.log(error)
  if (error.response.status) {
    switch (error.response.status) {
      case 401: // 未登录
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break
      case 404: // 未找到
        break
    }
    return Promise.reject(error.response)
  }
})

// 封装 get 方法
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    http.get(url, { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => { reject(err) })
  })
}

// 封装 post 方法
export function post (url, data) {
  return new Promise((resolve, reject) => {
    http.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => { reject(err) })
  })
}
