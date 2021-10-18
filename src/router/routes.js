
const routes = [
  {
    path: '/', name: 'homeuser', component: () => import('pages/User/DashboardUser.vue')
  },
  {
    path: '/home', name: 'home', component: () => import('pages/User/Dashboard.vue')
  },
  {
    path: '/login', name: 'login', component: () => import('pages/Guest/LoginAdmin.vue')
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/LoginLayout.vue'),
  //   children: [
  //     { path: 'login', name: 'login', component: () => import('pages/Guest/LoginAdmin.vue') },
  //     { path: 'register', name: 'register', component: () => import('pages/Guest/Register.vue') }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
