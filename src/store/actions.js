export default {
  async login({ dispatch }, payload) {
    await dispatch('authPost', {
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
      payload,
    });
  },
  async signup({ dispatch }, payload) {
    await dispatch('authPost', {
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
      payload,
    });
  },
  async authPost({ commit }, { url, payload }) {
    const response = await fetch(
      `${url}AIzaSyCqOM_flNtZMADRu76xghg0Jt0PEbiASTU`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || 'Failed to authenticate!'
      );
      throw error;
    }

    commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
