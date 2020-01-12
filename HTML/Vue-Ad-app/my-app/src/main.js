import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import * as fb from 'firebase'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: "AIzaSyCKd-h7AjzhuUXSZzhw8WXW6NdG_MgKgt4",
      authDomain: "eduard-sd-ads.firebaseapp.com",
      databaseURL: "https://eduard-sd-ads.firebaseio.com",
      projectId: "eduard-sd-ads",
      storageBucket: "eduard-sd-ads.appspot.com",
      messagingSenderId: "66001061538",
      appId: "1:66001061538:web:cd281c75c48e697c9e79fb"
    })
  },
}).$mount('#app')
