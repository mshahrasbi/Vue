import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../src/axios-auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {

  },
  actions: {

    signup({commit}, authData) {
        axios
          .post('/signupNewUser?key=AIzaSyBrdHhJxGq-Lxwq5JfVFkCrFy-1pTTLylw', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));        
    },
    login({commit}, authData) {
      axios
        .post('/verifyPassword?key=AIzaSyBrdHhJxGq-Lxwq5JfVFkCrFy-1pTTLylw', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  },
  getters: {

  }
})