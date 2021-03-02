import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/authentication/Login.vue';
import Register from './views/authentication/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/productList',
      name: 'List',
      component: () => import('./views/products/list.vue')
    },
    {
      path: '/addProduct',
      name: 'Save',
      component: () => import('./views/products/add.vue')
    },

    {
      path: '/editProduct/:productId',
      name: 'Edit',
      component: () => import('./views/products/edit.vue')
    },
     


  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
