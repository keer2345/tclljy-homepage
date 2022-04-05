export default [
  { path: '/', redirect: '/index' },
  {
    // title: 'hello',
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/index', component: '@/pages/index' },
      { path: '/login', component: '@/pages/Login' },
    ],
  },
  {
    component: '@/pages/exception/NotFound',
  },
]
