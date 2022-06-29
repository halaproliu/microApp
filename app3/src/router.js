import Home from './views/home.vue'
import RootApp from './views/rootApp.vue'

const routes = [
  {
    path: window.__MICRO_APP_BASE_ROUTE__ || '/app3',
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
