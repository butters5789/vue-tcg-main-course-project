export default {
  registerNewCoach(state, payload) {
    state.coaches.unshift(payload);
  },
};
