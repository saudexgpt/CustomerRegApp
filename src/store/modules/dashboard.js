import client from 'api-client'
import store from '@/store';

const state = {
  
};

const mutations = {
  
};

const actions = {
  // user login
  // eslint-disable-next-line no-empty-pattern
  fetchDashboardData({}, url) {
    return new Promise((resolve, reject) => {
      client.fetchDashboardDataApi(url)
        .then(response => {
          
          store.dispatch('orders/setTodayOrders', response.today_orders);
          store.dispatch('visits/setTodayVisits', response.today_visits);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  },
  

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
