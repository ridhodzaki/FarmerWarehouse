
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
  //   path: '/admin', name: 'admin', component: () => import('pages/Admin/DashboardAdmin.vue')
  // },
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'admin', name: 'login', component: () => import('pages/Admin/DashboardAdmin.vue') },
      { path: 'input', name: 'register', component: () => import('pages/Admin/InputData.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
