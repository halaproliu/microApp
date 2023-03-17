const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "app1" */ '@/pages/rootApp.vue'),
    children: [
      {
        path: 'svg',
        component: () =>
          import(/* webpackChunkName: "svg" */ '@/pages/svgProgress.vue')
      },
      {
        path: 'd3',
        component: () => import(/* webpackChunkName: "d3" */ '@/pages/d3.vue')
      }
    ]
  }
];
console.log(routes);
export default routes;
