// import client from 'api-client'
// simport store from '@/store';

const state = {
  customers: [],
};

const mutations = {
  SET_CUSTOMERS: (state, customers) => {
    state.customers = customers
  },
  ADD_NEW_CUSTOMER: (state, customer) => {
    state.customers.unshift(customer);
  }
};

const actions = {
  fetchCustomers({ commit }, customers) {
    commit('SET_CUSTOMERS', customers)
    // return client
    //   .fetchCustomersApi()
    //   .then(response => commit('SET_CUSTOMERS', response.customers))
  },
  addNewCustomer({ commit }, customer) {
    commit('ADD_NEW_CUSTOMER', customer)
    // return client
    //   .addCustomerApi(data)
    //   .then(response => commit('ADD_NEW_CUSTOMER', response.customer))
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
