import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import SignIn from '../views/SignIn.vue'
import SignOut from '../views/SignOut.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    //middleware
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        }) 
      }
      next()
    }
  },
    {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signOut',
    name: 'SignOut',
    component: SignOut
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
