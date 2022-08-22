import { createStore } from 'vuex';

import coaches from './coaches/index';
import requests from './requests/index';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const store = createStore({
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters,
  actions,
  mutations,
  modules: {
    coaches,
    requests,
  },
});

export default store;
