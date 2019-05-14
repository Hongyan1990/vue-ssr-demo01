const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})
const createErr = (code, res) => {
  const err = new Error(res.message)
  err.code = code
  return err
}
const handleResponse = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createErr(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleResponse(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (todo) {
      return handleResponse(await  request.post(
        `/${className}`,
        todo,
        {
          headers: getHeaders()
        }
      ))
    },
    async updateTodo (id, todo) {
      return handleResponse(await  request.put(
        `/${className}/${id}`,
        todo,
        {
          headers: getHeaders()
        }
      ))
    },
    async deleteTodo (id) {
      return handleResponse(await  request.delete(
        `/${className}/${id}`,
        {
          headers: getHeaders()
        }
      ))
    },
    async deleteCompleted (ids) {
      console.log(ids)
      const reqs = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleResponse(await request.post(
        '/batch',
        {
          requests: reqs
        },
        {
          headers: getHeaders()
        }
      ))
    }
  }
}
