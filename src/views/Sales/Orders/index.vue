<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end" class="padded" @click="closeModal">
        <ion-icon :icon="i.closeOutline" size="large"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-content">
    <ion-list v-if="orders.length > 0">
      <order-element :data="orders" />
    </ion-list>
    <ion-list v-else>
      <ion-item lines="none">
        <ion-icon  :icon="i.informationCircleOutline" />
        <ion-text color="danger">
          There are no orders!
        </ion-text>
      </ion-item>
    </ion-list>
    
    <ion-loading
      :is-open="openLoader"
      message="Loading..."
      :duration="timeout"
      @onDidDismiss="setOpen(false)"
    />
  </ion-content>
</template>
<script>
import OrderElement from './partials/OrderElement';
import { IonItem, IonLoading, modalController } from '@ionic/vue';
// import PageHeader from '@/components/Header';
// import Tabs from '@/components/Tabs';
export default {
  name: 'Orders',
  components: {
    IonItem, IonLoading, OrderElement
  },
  props: {
    title: { type: String, default: 'All Orders' },
  },
  data() {
    return {
      
      permission: '',
      contacts: [],
      call_logs: [],
      listTyle: '',
      openLoader: false,
      orders: [],
    }
  },
  computed: {
    // orders() {
    //   return this.$store.getters.orders
    // },
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    setOpen(value){
      this.openLoader = value;
    },
    fetchOrders() {
      var app = this;
      app.openLoader = true;
      app.$store.dispatch('orders/fetchOrders').then(response => {
        app.orders = response.orders;        
        app.openLoader = false; 
      }) 
      
    },
    async closeModal()
    {
      const modal = await modalController      
      return modal.dismiss();
    }
    
  },

}
</script>
<style scoped>
p{
  margin-top: 0;
}
.call-button {
  border-radius: 50%;
  padding: 5px;
  font-size: 5px;
}
.small {
  font-size: 8px;
}
</style>