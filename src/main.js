// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VueFire from 'vuefire'
import App from './App'
import firebase from 'firebase'

Vue.use(VueRouter)
Vue.use(VueFire)

Vue.config.productionTip = false


firebase.auth().onAuthStateChanged(function (user) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
})
