export default [
  // { path: '/', redirect: '/index' },
  {
    // title: 'hello',
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', component: '@/pages/index' },
      // user
      { path: '/user/login', component: '@/pages/user/Login' },
      { path: '/user/register', component: '@/pages/user/Register' },
      { path: '/user/account', component: '@/pages/user/Account' },
      { path: '/user/setting', component: '@/pages/user/Setting' },

      { path: '/job', component: '@/pages/job/All' },
      { path: '/job/info/:id', component: '@/pages/job/Info/index' },

      { path: '/resume', component: '@/pages/resume/All' },
    ],
  },
  {
    component: '@/pages/exception/NotFound',
  },
]
