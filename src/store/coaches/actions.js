export default {
  registerNewCoach({ commit, rootGetters }, payload) {
    const newCoach = {
      id: rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.rate,
    };

    commit('registerNewCoach', newCoach);
  },
};
