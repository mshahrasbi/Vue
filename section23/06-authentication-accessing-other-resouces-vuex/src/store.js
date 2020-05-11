import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../src/axios-auth';
import globalAxios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, authData) {
      state.idToken = authData.token;
      state.userId = authData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    }
  },
  actions: {

    signup({commit, dispatch}, authData) {
        axios
          .post('/signupNewUser?key=AIzaSyBrdHhJxGq-Lxwq5JfVFkCrFy-1pTTLylw', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            console.log(res);
            commit('authUser', {
              token: res.data.idToken,
              userId: res.data.localId
            });
            dispatch('storeUser', authData);
          })
          .catch(err => console.log(err));        
    },
    login({commit}, authData) {
      axios
        .post('/verifyPassword?key=AIzaSyBrdHhJxGq-Lxwq5JfVFkCrFy-1pTTLylw', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
      .catch(err => console.log(err));
    },
    storUser({commit}, userData) {
      globalAxios.post('/user.json', userData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    fetchUser({commit}) {
      globalAxios.get('/users.json')
        .then(res => {
          console.log(res)

          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }

          console.log(users);
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err));  
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
})