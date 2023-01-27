import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/app1*',
    name: 'app1',
    component: () => import(/* webpackChunkName: "app1" */ '@/pages/app1.vue'),
  },
  {
    path: '/app2*',
    name: 'app2',
    component: () => import(/* webpackChunkName: "app1" */ '@/pages/app2.vue'),
  },
  {
    path: '/app3*',
    name: 'app3',
    component: () => import(/* webpackChunkName: "app1" */ '@/pages/app3.vue'),
  },
  {
    path: '/app4*',
    name: 'app4',
    component: () => import(/* webpackChunkName: "app1" */ '@/pages/app4.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title
  }
  next()
})

export default router