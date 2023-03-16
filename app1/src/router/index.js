const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "app1" */ '@/pages/rootApp.vue'),
    children: [
      {
        path: '/svg',
        component: () =>
          import(/* webpackChunkName: "app1" */ '@/pages/svgProgress.vue')
      }
    ]
  }
];

export default routes;
