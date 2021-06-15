import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
  },
  {
    path: '/',
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
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    props:true,
    component: () => import(/* webpackChunkName: "Article" */ '../views/article/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
