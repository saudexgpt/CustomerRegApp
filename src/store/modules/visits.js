import client from 'api-client'
// simport store from '@/store';

const state = {
  todayVisits: [],
};

const mutations = {
  SET_VISITS: (state, visits) => {
    state.visits = visits
  }
};

const actions = {
  fetchVisits() {
    return new Promise((resolve, reject) => {
      client.fetchVisitsApi()
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject('Error: ' + error);
        });
    });
  },
  setTodayVisits({commit}, visits) {
    commit('SET_VISITS', visits)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
