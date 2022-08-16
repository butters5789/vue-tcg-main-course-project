import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  state() {
    return {
      requests: [],
    };
  },
  getters,
  actions,
  mutations,
  namespaced: true,
};
