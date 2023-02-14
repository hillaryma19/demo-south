import { Message } from 'element-ui'

import axios from 'axios'

import baseURL from './config.js'

import { getCookie, removeCookie } from './cookie.js'

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  timeout: 30000,// request timeout
  withCredentials: true,// send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let token = getCookie('token') || '';
    if (token) {
      config.headers['token'] = token // 除了登录接口，其他都需要带token
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  response => {
    const res = response.data;
    console.log(response, '--response--');
    // if the custom code is not 20000, it is judged as an error.
    if (res.status === 200) {//200: 正常返回

    } else {

      return res
    }
  },
  error => {
    console.log(error, '=error');
    if (error && error.message) {
      Message.error(error.message)
    }
    source.cancel()
    return Promise.reject(error)
  }
)

export default service
