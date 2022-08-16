export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((request) => {
      return request.coachId === coachId;
    });
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
