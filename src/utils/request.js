import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', //接口的基准路径

  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]

})

//请求拦截器

request.interceptors.request.use(
  function(config) {
    // 请求发起经过这里
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  function(error) {
    // 请求出错进入这里
    return Promise.reject(error)
  }
)

//响应拦截器

export default request
