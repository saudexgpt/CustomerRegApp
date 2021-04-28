import { createRouter, createWebHistory } from '@ionic/vue-router';
// import Home from '@/views/Home.vue'
// import Login from '@/views/Auth/Login.vue'

export const constantRoutes = [
  
  {
    path: '/login',
    component: () =>
        import ('@/views/Auth/Login'),
    hidden: true,
  },
  // {
  //   path: '/auth-redirect',
  //   component: () =>
  //       import ('@/app/login/AuthRedirect'),
  //   hidden: true,
  // },
  {
    path: '/404',
    name: 'Page404',
    component: () => import ('@/views/ErrorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import ('@/views/ErrorPage/401'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },  
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Dashboard/index'),
    hidden: true,
  },

  {
    path: '/sales',
    name: 'Sales',
    component: () => import('@/views/Sales/index'),
    meta: { title: 'Sales', icon: 'swapHorizontalOutline' },
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('@/views/Customers/index'),
    hidden: true,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Sales/Orders'),
    hidden: true,
  },
  {
    path: '/visits',
    name: 'Visits',
    component: () => import('@/views/Sales/Visits'),
    hidden: true,
  },
  

  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
];

// const routes = [
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/home',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   }
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes,
  });
  router.matcher = newRouter.matcher; // reset router
}
export default router
