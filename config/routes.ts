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
      { path: '/user/logout', component: '@/pages/user/Logout' },
      { path: '/user/register', component: '@/pages/user/Register' },
      { path: '/user/account', component: '@/pages/user/Account' },
      { path: '/user/setting', component: '@/pages/user/Setting' },

      { path: '/user/company', component: '@/pages/user/MyFirm' },

      { path: '/job', component: '@/pages/job/All' },
      { path: '/job/info/:id', component: '@/pages/job/Info/index' },

      { path: '/resume', component: '@/pages/resume/All' },
      { path: '/resume/info/:id', component: '@/pages/resume/Info/index' },

      { path: '/company', component: '@/pages/firm/All' },
      { path: '/company/info/:id', component: '@/pages/firm/Info/index' },
    ],
  },
  {
    component: '@/pages/exception/NotFound',
  },
]
