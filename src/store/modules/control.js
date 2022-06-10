const state = {
  sid: 0,
  modelinfo: null
};

const mutations = {
  SET_SELECTID: (state, id) => {
    state.sid = id;
  },
  SET_MODELINFO: (state, data) => {
    state.modelinfo = data;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
