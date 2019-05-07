// import Todo from '../views/todo/Todo.vue'
// import Login from '../views/login/Login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    // props: (route) => ({id: route.query.b}),
    name: 'app',
    component: () => import('../views/todo/Todo.vue'),
    beforeEnter (to, from, next) {
      console.log('routes before enter')
      next()
    }
    // components: {
    //   default: Todo,
    //   a: Login
    // }
  },
  {
    path: '/login',
    component: () => import('../views/login/Login.vue')
  }
]
