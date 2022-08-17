export default {
  registerNewCoach(state, payload) {
    state.coaches.unshift(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setLastDataFetch(state) {
    state.lastFetch = new Date().getTime();
  },
};
