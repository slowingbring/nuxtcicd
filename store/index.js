const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => {
  return {
    user: null,
  };
};
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {
        // No valid cookie found
      }
    }
    commit("setUser", user);
  },
  loginAction({ commit }, user) {
    commit("setUser", user);
    Cookie.set("user", user);
  },
  quitAction({ commit }) {
    commit("setUser", null);
    Cookie.set("user", null);
  },
};
