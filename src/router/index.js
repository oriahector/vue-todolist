import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: TodoList,
      meta: {
        autentificado: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser
  console.log(usuario)
  let autorizacion = to.matched.some(record => record.meta.autentificado)
  if (autorizacion && !usuario) {
    next('login')
  } else if (!autorizacion && usuario) {
    next('home')
  } else {
    next()
  }
})


export default router;
