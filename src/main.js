import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
Vue.config.productionTip = false;
//标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
//axios
Vue.prototype.httpRequest= axios
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
