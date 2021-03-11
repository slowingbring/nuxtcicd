import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7c181ce0 = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "pages/article/index" */))
const _244e9e62 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _8592ff86 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _51d47aea = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _f4d075ea = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _a5dbb72a = () => interopDefault(import('..\\pages\\article\\components\\BaseSlugComment.vue' /* webpackChunkName: "pages/article/components/BaseSlugComment" */))
const _5e1c77a9 = () => interopDefault(import('..\\pages\\article\\components\\BaseSlugMeta.vue' /* webpackChunkName: "pages/article/components/BaseSlugMeta" */))
const _7f855f70 = () => interopDefault(import('..\\pages\\article\\_slug.vue' /* webpackChunkName: "pages/article/_slug" */))
const _28cef1c6 = () => interopDefault(import('..\\pages\\user\\_username.vue' /* webpackChunkName: "pages/user/_username" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _7c181ce0,
    name: "article"
  }, {
    path: "/",
    component: _244e9e62,
    name: "home"
  }, {
    path: "/login",
    component: _8592ff86,
    name: "login"
  }, {
    path: "/register",
    component: _51d47aea,
    name: "register"
  }, {
    path: "/settings",
    component: _f4d075ea,
    name: "settings"
  }, {
    path: "/article/components/BaseSlugComment",
    component: _a5dbb72a,
    name: "article-components-BaseSlugComment"
  }, {
    path: "/article/components/BaseSlugMeta",
    component: _5e1c77a9,
    name: "article-components-BaseSlugMeta"
  }, {
    path: "/article/:slug",
    component: _7f855f70,
    name: "article-slug"
  }, {
    path: "/user/:username?",
    component: _28cef1c6,
    name: "user-username"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
