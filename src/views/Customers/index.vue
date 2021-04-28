<template>
  <ion-page class="ion-page">   
    <page-header title="Customer List" v-if="pageOption == 'customers_list'" />
    <ion-content>
      <customer-list v-if="pageOption == 'customers_list'" @viewDetails="loadCustomerDetails"/>
      <add-customer v-if="pageOption == 'add_customer'" @display="displayParent" />
      <customer-details v-if="pageOption == 'customer_details'" :parent="parent" :customer="customer" @display="displayParent"/>
      
      <ion-fab v-if="pageOption == 'customers_list'" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addCustomer()">
          <ion-icon :icon="i.add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <tabs />
  </ion-page>  
</template>

<script>

import AddCustomer from './AddCustomer';
import PageHeader from '@/components/Header.vue';
import CustomerList from './CustomerList'
import CustomerDetails from './CustomerDetails'
import { IonContent, IonPage } from '@ionic/vue';
import Tabs from '@/components/Tabs';
// Resource for API calls
import Resource from '@/api/resource';
export default {
  name: 'Customers',
  components: {
    IonContent,
    IonPage,
    PageHeader,
    CustomerList,
    CustomerDetails,
    AddCustomer,
    Tabs,
  },
  data() {
    return {
      parent: 'customers_list',
      pageOption: 'customers_list',
      customer: '',
      openLoader: false,
    }
  },
  computed: {

    customers() {
      return this.$store.getters.customers
    },
  },
  created () {
    this.fetchPersistentData();
  },
  methods: {
    async fetchPersistentData() {
      const fetchTierResource = new Resource('tiers/fetch');      
      const fetchCustomerTypeResource = new Resource('customer-types/fetch');
      const fetchRegionResource = new Resource('regions/index');
      const fetchCustomersResource = new Resource('customers/fetch'); // enter the fetch customer url
      const fetchProductResource = new Resource('products');

      const { items }  = await fetchProductResource.list();
      const { tiers }  = await fetchTierResource.list();
      const { customer_types } = await fetchCustomerTypeResource.list();
      const { regions } = await fetchRegionResource.list();
      const { customers } = await fetchCustomersResource.list();
      this.customers = customers;
      this.$store.dispatch('tiers/saveTiers', tiers);
      this.$store.dispatch('customerTypes/saveCustomerTypes', customer_types);      
      this.$store.dispatch('regions/saveRegions', regions);
      this.$store.dispatch('customers/fetchCustomers', customers);
      this.$store.dispatch('products/setProducts', items);
    },
    loadCustomerDetails(customer){
      const app = this;
      app.customer = customer;
      app.pageOption = 'customer_details';
    },
    displayParent(parent){
      // console.log(parent)
      this.pageOption = parent
    },    
    addCustomer() {
      this.pageOption = 'add_customer';
    },
  },
};
</script>

<style scoped>
</style>