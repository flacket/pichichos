import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import firebaseApp from './FirebaseApp';
import "firebase/compat/auth";

//Vue.prototype.isLoggedIn = false
Vue.config.productionTip = false;

let app = '';
firebaseApp.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});