import router from '@/router';
import store from '@/store';
// import NProgress from 'nprogress'; // progress bar
// import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
// import getPageTitle from '@/utils/get-page-title';

// NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  setInterval(await function () {    
    store.dispatch('user/setConnectionMode', navigator.onLine);
  }, 3000);
  // start progress bar
  // NProgress.start();
  // set page title
  // document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path !== '/default-password/change') {
      if (store.getters.pStatus !== 'default') {
        if (to.path === '/login') {
          // if is logged in, redirect to the home page
          next({ path: '/' });
          // NProgress.done();
        } else {
          // check whether password status is default and redirect user to change their password

          // determine whether the user has obtained his permission roles through getInfo
          const hasRoles = store.getters.userData.roles && store.getters.userData.roles.length > 0;
          if (hasRoles) {
            next();
          } else {
            try {
              // get user info
              // note: roles must be a object array! such as: ['admin'] or ,['manager','editor']
              const { roles, permissions } = await store.dispatch('user/getInfo');

                // generate accessible routes map based on roles
                await store.dispatch('permission/generateRoutes', roles, permissions);
                // console.log(to);
                store.dispatch('permission/canAccess', { roles, permissions }, to).then(response => {
                // dynamically add accessible routes
                // console.log(response);
                if (!response) {
                  router.push({ path: 'home' });
                }
                next({...to, replace:true});
                // router.replace(to.fullPath)
              });
            } catch (error) {
              // remove token and go to login page to re-login
              await store.dispatch('user/resetToken');
              // Message.error(error || 'Has Error');
              next(`/login`);
              // router.push({ path: 'login' });
              // NProgress.done();
            }
          }
        }
      } else {
        // next('/default-password');
        router.push({ path: 'default-password' });
        // NProgress.done();
      }
    } else {
      next();
      // NProgress.done();
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`);
      // router.push({ path: 'login' });
      // NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  // NProgress.done();
});
