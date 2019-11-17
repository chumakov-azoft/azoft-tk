import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

if (window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
}
