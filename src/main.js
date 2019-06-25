import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebaseAuth from '@/database/FirebaseAuth'

Vue.config.productionTip = false

let app = '';
firebaseAuth.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});