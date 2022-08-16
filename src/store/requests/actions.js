export default {
  contactCoach({ commit }, { coachId, email, message }) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId,
      email,
      message,
    };

    commit('addRequest', newRequest);
  },
};
