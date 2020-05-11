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
            // we want to make sure that if I do login and then I reload the page, I still am logged in because the 
            // token it still would be valid. Now to do this, I first of all need to store the token somewhere than in Vuex
            // store because the vuex store is Js and therefore is lost just as all the other data in js files is on page
            // reloads. We cal use localStorage (part of browser API) can be accessed from within the browser. It is not 
            // Vue feature which allows us to store key value pairs in a presistent browser storage.
            //
            const now = new Date();
            const expirationDate = new Date(now + (res.data.expiresIn * 1000));
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            //
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
          // we want to make sure that if I do login and then I reload the page, I still am logged in because the 
          // token it still would be valid. Now to do this, I first of all need to store the token somewhere than in Vuex
          // store because the vuex store is Js and therefore is lost just as all the other data in js files is on page
          // reloads. We cal use localStorage (part of browser API) can be accessed from within the browser. It is not 
          // Vue feature which allows us to store key value pairs in a presistent browser storage.
          //
          const now = new Date();
          const expirationDate = new Date(now + (res.data.expiresIn * 1000));
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          //

          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch('setLogoutTimer', res.data.expiresIn);
        })
      .catch(err => console.log(err));
    },
    tryAutoLogin({commit}) {
      const token = localStorage.getItem('token');
      if (!token){
        return;
      }

      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }

      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({commit}) {
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');

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