import cookie from '../../util/cookie.js'
export default {
  count: 0,
  firstName: 'Jia',
  lastName: 'Hongyan',
  todos: [],
  todo: {},
  userInfo: {
    name: cookie.getCookie('name') || '',
    token: cookie.getCookie('token') || ''
  },
  loading: false
}
