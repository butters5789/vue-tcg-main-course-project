import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  state() {
    return {
      lastFetch: null,
      coaches: [],
      isLoading: false,
    };
  },
  getters,
  actions,
  mutations,
  namespaced: true,
};
