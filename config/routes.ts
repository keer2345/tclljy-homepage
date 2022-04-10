export default [
  { path: '/', redirect: '/index' },
  {
    // title: 'hello',
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/index', component: '@/pages/index' },
      // user
      { path: '/user/login', component: '@/pages/user/Login' },
      { path: '/user/register', component: '@/pages/user/Register' },
    ],
  },
  {
    component: '@/pages/exception/NotFound',
  },
]
