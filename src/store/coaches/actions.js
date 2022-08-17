export default {
  async registerNewCoach({ commit, rootGetters }, payload) {
    const userId = rootGetters.userId;
    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.rate,
    };

    const response = await fetch(
      `https://vue-tcg-main-course-project-default-rtdb.firebaseio.com/coaches/${userId}/.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // throw error
    }

    commit('registerNewCoach', {
      id: userId,
      ...responseData,
    });
  },
  async getAllCoaches({ commit }) {
    const coaches = [];

    commit('setIsLoading', true);

    const response = await fetch(
      'https://vue-tcg-main-course-project-default-rtdb.firebaseio.com/coaches.json'
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coach);
    }

    commit('setCoaches', coaches);
    commit('setIsLoading', false);
  },
};
