import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vue-http-abe78.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'iuhufh uehaef a';
axios.defaults.headers.get['Accepts'] = 'application/json';

const requestInterceptor = axios.interceptors.request.use( config => {

  console.log('[main.js] Request Interceptor: ', config);
  return config;
});

const responseInterceptor = axios.interceptors.response.use( res => {

  console.log('[main.js] Response Interceptor: ', res);
  return res;
});

// to remove the interceptors
axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
