import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
FastClick.attach(document.body)
Vue.use(VueLazyload,{
  loading:require('./assets/img/liu.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
