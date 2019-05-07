import Router from 'vue-router'
import routes from './routes.js'

export default () => {
  return new Router({
    routes,
    mode: 'history'
    // base: '/client/',
    // linkActiveClass: 'link-active',
    // linkExactActiveClass: 'link-exact-active'
    // scrollBehavior (to, from, savedPosition) {
    //
    // },
    // parseQuery () {},
    // stringifyQuery () {}
  })
}
