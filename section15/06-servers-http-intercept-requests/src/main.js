import Vue from 'vue'
import VueResource from 'vue-resource';

import App from './App.vue'

Vue.use(VueResource);

Vue.http.options.root = 'https://vue-http-abe78.firebaseio.com/data.json';

Vue.http.interceptors.push( (req, next) => {
  console.log("[main.js] req: ", req);

  if (req.method == 'POST') {
    req.method = 'PUT';
  }

  next();
});

new Vue({
  el: '#app',
  render: h => h(App)
})
