const axios = require('axios')

const createError = require('./util.js')

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  new Promise((resolve, reject) => {
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
    })
  })
}

module.exports = {
  getAllTodos () {
    return handleRequest(request.get('api/todo'))
  }
}
