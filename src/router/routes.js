
const routes = [
  {
    path: '/',
    name: 'homeuser',
    component: () => import('pages/User/DashboardUser.vue')
  },
  {
    path: '/',
    meta: {
      authAdmin: true
    },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'admin', name: 'homeadmin', component: () => import('pages/Admin/DashboardAdmin.vue') },
      { path: 'input', name: 'inputData', component: () => import('pages/Admin/InputData.vue') },
      { path: 'edit/:id', name: 'editData', component: () => import('pages/Admin/EditData.vue') },
      { path: 'kategori', name: 'kategori', component: () => import('src/pages/Admin/Kategori.vue') }
      // { path: 'edit/:id', name: 'editData', component: () => import('pages/Admin/EditData.vue') },
      // { path: 'edit/:id', name: 'editData', component: () => import('pages/Admin/EditData.vue') },
      // { path: 'edit/:id', name: 'editData', component: () => import('pages/Admin/EditData.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/Guest/LoginAdmin.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
