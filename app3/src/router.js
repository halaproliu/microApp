import Home from './views/home.vue'
import RootApp from './views/rootApp.vue'

const routes = [
  {
    path: '/app3',
    component: RootApp,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'page2',
        component: () => import('./views/page2.vue')
      }
    ]
  }
]

export default routes
