import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wealth',
      name: 'Wealth',
      component: () => import('./views/Wealth.vue')
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: () => import('./views/Shopping.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('./views/User.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    },
    {
      path: '/facedetect',
      name: 'FaceDetect',
      component: () => import('./views/FaceDetect.vue')
    },
    {
      path: '/qrcodescan',
      name: 'QrcodeScan',
      component: () => import('./views/QrcodeScan.vue')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('./views/Message.vue')
    }
  ]
})

export default router
