export default {
  async contactCoach({ commit }, { coachId, email, message }) {
    const newRequest = {
      email,
      message,
    };

    const response = await fetch(
      `https://vue-tcg-main-course-project-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error.message || 'Failed to fetch!');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = coachId;

    commit('addRequest', newRequest);
  },
  async getCoachRequests({ commit, rootGetters }) {
    const coachId = rootGetters.userId;
    const requests = [];
    const token = rootGetters.token;

    const response = await fetch(
      `https://vue-tcg-main-course-project-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error.message || 'Failed to fetch!');
      throw error;
    }

    for (const key in responseData) {
      const request = {
        id: key,
        coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    commit('setRequests', requests);
  },
};
