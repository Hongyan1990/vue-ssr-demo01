const axios = require('axios')

const createError = require('./util.js')

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(response => {
      const data = response.data
      if (!data) {
        reject(createError(400, 'no data'))
        return
      }
      if (!data.success) {
        reject(createError(400, data.message))
        return
      }
      resolve(data.data)
    }).catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        reject(createError(401, 'need login'))
        return
      }
      if (err.response.status === 400) {
        reject(createError(400, err.response.data.message))
      }
    })
  })
}

module.exports = {
  getAllTodos () {
    return handleRequest(request.get('api/todo'))
  },
  userLogin (username, password) {
    return handleRequest(request.post('user/login', {username, password}))
  }
}
