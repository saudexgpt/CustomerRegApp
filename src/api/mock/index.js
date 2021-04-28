import customers from './data/customers'
import orders from './data/orders'
import sales from './data/sales'
import users from './data/users'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}
const findUser = (users, token) => { // Find array element which has a key value of val 
  for (var ai, i = users.length; i--;)
    if ((ai = users[i]) && ai['tk'] == token)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(ai)
        }, 1000)
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1000)
    })
}
const loginUser = (users, credentials) => { // Find array element which has a key value of val 
  const { email, password } = credentials;
  for (var ai, i = users.length; i--;)
    if ((ai = users[i]) && (ai['email'] == email || ai['phone'] == email) && ai['password'] == password) 
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(ai)
        }, 1000)
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1000)
    })
}

export default {
  loginApi(credentials) {
    return loginUser(users, credentials) // wait 1s before returning posts
  },
  logoutApi(token) {
    return findUser(users, token)
  },
  getUserInfoApi(token) {
    return findUser(users, token)
  },

  ////////////////////////CUSTOMERS/////////////////////////////////////
  fetchCustomersApi () {
    return fetch(customers, 1000) // wait 1s before returning posts
  },
  addCustomerApi(new_customer) {
    return fetch(new_customer, 500)
  },
  //////////////////////CUSTOMERS ENDS//////////////////////////////
  fetchOrdersApi () {
    return fetch(orders, 1000) // wait 1s before returning posts
  },

  ////////////////////////SALES/////////////////////////////////////
  fetchSalesApi () {
    return fetch(sales, 1000) // wait 1s before returning posts
  },
  addSaleApi(new_record) {
    return fetch(new_record, 500)
  }
  ////////////////////////SALES ENDS///////////////////////////////
}