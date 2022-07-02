const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app1" */ '@/pages/rootApp.vue'),
    children: []
  }
]

export default routes
