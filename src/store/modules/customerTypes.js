// import client from 'api-client'
// simport store from '@/store';

const state = {
  customerTypes:  [],
};

const mutations = {
  SET_CUSTOMER_TYPES: (state, customerTypes) => {
    // localStorage.setItem("customer_types", JSON.stringify(customerTypes));
    state.customerTypes = customerTypes
  },
};

const actions = {
  // fetchCustomerTypes ({ commit }) {
  //   return client
  //     .fetchCustomerTypesApi()
  //     .then(response => commit('SET_CUSTOMER_TYPES', response.customer_types))
  // },
  saveCustomerTypes ({ commit }, customer_types) {
    commit('SET_CUSTOMER_TYPES', customer_types)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
