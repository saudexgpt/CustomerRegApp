// import client from 'api-client'
// simport store from '@/store';

const state = {
  regions:  [],
};

const mutations = {
  SET_REGIONS: (state, regions) => {
    // localStorage.setItem("regions", JSON.stringify(regions));
    state.regions = regions
  },
};

const actions = {
  // fetchRegions ({ commit }) {
  //   return client
  //     .fetchRegionsApi()
  //     .then(response => commit('SET_REGIONS', response.regions))
  // },
  saveRegions ({ commit }, regions) {
    commit('SET_REGIONS', regions)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
