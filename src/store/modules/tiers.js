// import client from 'api-client'
// import { get, set } from 'idb-keyval';
// simport store from '@/store';

const state = {
  tiers: [],
};

const mutations = {
  SET_TIERS: (state, tiers) => {
    // set('tiers', tiers);
    // localStorage.setItem("tiers", JSON.stringify(tiers));
    state.tiers = tiers
  },
};

const actions = {
  // fetchTiers ({ commit }) {
  //   return client
  //     .fetchTiersApi()
  //     .then(response => commit('SET_TIERS', response.tiers))
  // },
  saveTiers ({ commit }, tiers) {
    commit('SET_TIERS', tiers)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
