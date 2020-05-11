import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../src/axios-auth';
import globalAxios from 'axios';

import router from './router';


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
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {

    setLogoutTimer( {commit}, expirationTime) {
      setTimeout( () => {
        commit("clearAuthData");
      }, expirationTime *1000);
    },
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
            dispatch('setLogoutTimer', res.data.expiresIn);
          })
          .catch(err => console.log(err));        
    },
    login({commit, dispatch}, authData) {
      axios
        .post('/verifyPassword?key=AIzaSyBrdHhJxGq-Lxwq5JfVFkCrFy-1pTTLylw', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log('[store] login', res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch('setLogoutTimer', res.data.expiresIn);
        })
      .catch(err => console.log(err));
    },
    logout({commit}) {
      commit('clearAuthData');
      router.replace('/signin');
    },
    storeUser({commit, state}, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios.post('/user.json' + '?aurh=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    fetchUser({commit, state}) {
      if (!state.idToken) {
        return;
      }

      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log('[fetchUser]', res)

          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }

          console.log('[fetchUser] User', users);
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err));  
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated (state) {
      return state.idToken !== null;
    }
  }
})