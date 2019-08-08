import cookie from '../util/cookie.js'
const axios = require('axios')

const createError = require('./util.js')

const request = axios.create({
  baseURL: '/'
})
request.interceptors.request.use(
  config => {
    let token = cookie.getCookie('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `JWT ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(response => {
      const data = response.data
      if (!data) {
        reject(createError(400, 'no data'))
        return
      }
      // if (!data.success) {
      //   reject(createError(400, data.message))
      //   return
      // }
      resolve(data)
    }).catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        reject(createError(401, 'need login'))
        return
      }
      if (err.response.status === 400) {
        reject(createError(400, err.response.data.message))
        return
      }
      if (err.response.status === 404 && err.response.data.detail === 'Not found.') {
        resolve({status: false, detail: '该用户不存在'})
        return
      }
      if (err.response.status === 404) {
        reject(createError(404, '路径错误'))
      }
    })
  })
}

module.exports = {
  getAllTodos (param) {
    return handleRequest(request.get(`api/points/?${param}`))
  },
  getTodo (id) {
    return handleRequest(request.get(`api/points/${id}`))
  },
  userLogin (username, password) {
    return handleRequest(request.post('api/login/', {username, password}))
  },
  addTodo (todo) {
    return handleRequest(request.post('api/points/', todo))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`api/points/${id}/`, todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`api/todo/${id}`))
  },
  clearAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', {ids}))
  }
}
