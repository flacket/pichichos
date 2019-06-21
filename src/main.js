import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
//import firebaseAuth from '@/database/FirebaseAuth'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*
let app;
firebaseAuth.onAuthStateChanged(user => {
  if(!app){
app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
  }
})
*/



