import {  login, logout, getInfo } from '@/api/auth';
import Resource from '@/api/resource';


export default {
  ////////////////////////AUTH Matters//////////////////////////////
  loginApi(credentials) {
    const { email, password } = credentials;    
    return login({ email: email.trim(), password: password }).then(response => response);
  },
  logoutApi(token) {
    return logout(token).then(response => response);
  },
  getUserInfoApi(token) {  
    return getInfo(token).then(response => response.data);
  },
  ////////////////////////AUTH Matters//////////////////////////////


  
  fetchDashboardDataApi(url) {
    const fetchResource = new Resource('dashboard/'+ url); // enter the fetch customer url
    return fetchResource.list().then(response => response);
  },
  ////////////////////////CUSTOMERS/////////////////////////////////////
  fetchCustomersApi() {
    const fetchResource = new Resource('customers/fetch'); // enter the fetch customer url
    return fetchResource.list().then(response => response);
  },
  addCustomerApi(new_record) {
    const fetchResource = new Resource('customers/store'); // enter the fetch orders url
    return fetchResource.store(new_record).then(response => response);
  },
  ////////////////////////CUSTOMERS/////////////////////////////////////

  ////////////////////////SALES/////////////////////////////////////
  fetchSalesApi() {
    const fetchResource = new Resource('sales/fetch'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  addSaleApi(new_record) {
    const fetchResource = new Resource('sales/store'); // enter the fetch orders url
    return fetchResource.store(new_record).then(response => response);
  },
  ////////////////////////SALES/////////////////////////////////////

  //////////////////////ORDERS/////////////////////////////////////
  
  fetchOrdersApi() {
    const fetchResource = new Resource('sales/fetch'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  //////////////////////ORDERS/////////////////////////////////////
  //////////////////////VISITS/////////////////////////////////////
  
  fetchVisitsApi() {
    const fetchResource = new Resource('visits/fetch'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  //////////////////////VISITS/////////////////////////////////////

  //////////////////////REGIONS/////////////////////////////////////
  
  fetchRegionsApi() {
    const fetchResource = new Resource('regions/index'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  //////////////////////REGIONS/////////////////////////////////////
  //////////////////////CUSTOMER TYPES/////////////////////////////////////
  
  fetchCustomerTypesApi() {
    const fetchResource = new Resource('customer-types/fetch'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  //////////////////////CUSTOMER TYPES/////////////////////////////////////
  //////////////////////TIERS/////////////////////////////////////
  
  fetchTiersApi() {
    const fetchResource = new Resource('tiers/fetch'); // enter the fetch orders url
    return fetchResource.list().then(response => response);
  },
  //////////////////////TIERS/////////////////////////////////////
}
