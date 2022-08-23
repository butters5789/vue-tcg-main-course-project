let expirationTimer;

export default {
  async login({ dispatch }, payload) {
    return dispatch('authPost', {
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
      payload,
    });
  },
  async signup({ dispatch }, payload) {
    return dispatch('authPost', {
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
      payload,
    });
  },
  async authPost({ commit, dispatch }, { url, payload }) {
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

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    expirationTimer = setTimeout(() => {
      dispatch('autoLogout');
    }, expiresIn);

    commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(expirationTimer);

    commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    expirationTimer = setTimeout(() => {
      dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      commit('setUser', {
        token,
        userId,
      });
    }
  },
  autoLogout({ commit, dispatch }) {
    dispatch('logout');

    commit('setAutoLogout');
  },
};
