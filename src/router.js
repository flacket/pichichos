import Vue from 'vue'
import Router from 'vue-router'
import firebaseAuth from '@/database/FirebaseAuth'

import Home from './views/Home.vue'
import ErrorPage from './views/ErrorPage.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/error',
      name: 'errorPage',
      component: ErrorPage
    },
    {
      path: '/encontradas',
      name: 'encontradas',
      component: () => import('./views/Encontradas.vue'),
      meta:{
        requiresAuth: true
      }
    },    
    {
      path: '/configuracion',
      name: 'configuracion',
      component: () => import('./views/Configuracion.vue'),
      meta:{
        requiresAuth: true
      }
    },   
    {
      path: '/acerca',
      name: 'acerca',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue'),
      meta:{
        requiresAuth: true
      }
    }
  ]
});

//Nav Royal Guards
router.beforeEach((to, from, next) => {
  //check for requireddAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //check if NOT logged in
    if(!firebaseAuth.currentUser){
      //Go to login 
      next({
        path: '/error',
        query:{
          redirect: to.fullPath
        }
      });
    } else next();
  } else if (to.matched.some(record => record.meta.requiresGuest)){
      //check if logged in
    if(firebaseAuth.currentUser){
      //Go to login 
      next({
        path: '/',
        query:{
          redirect: to.fullPath
        }
      });
    } else next();
  } else next();
});

export default router;