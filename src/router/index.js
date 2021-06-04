import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "Layout" */ '../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/layout/home/index.vue'),
      },
      {
        path: '/answer',
        name: 'Answer',
        component: () => import(/* webpackChunkName: "Answer" */ '../views/layout/answer/index.vue'),
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import(/* webpackChunkName: "Video" */ '../views/layout/video/index.vue'),
      },
      {
        path: '/my',
        name: 'My',
        component: () => import(/* webpackChunkName: "My" */ '../views/layout/my/index.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
