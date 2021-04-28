<template>  
  <ion-page class="ion-page">
    <page-header title="Dashboard" v-if="pageOption == 'dashboard'" />
    
    <ion-toolbar>
      <dashboard-slide-cards :dashboard-data="dashboardData" />
      <!-- <ion-item button @click="openContact(true)" detail>
        <ion-label>
          Call Log
        </ion-label>
      </ion-item> -->
      <ion-segment :value="selectedTab" @ionChange="changeTab($event)" scrollable="true" >
        <!-- <ion-segment-button value="call_log">
          <ion-icon :icon="call"></ion-icon>
          <ion-label>Call-Log</ion-label>
        </ion-segment-button> -->
        <ion-segment-button value="orders">
          <ion-label>Today's Orders</ion-label>
        </ion-segment-button>
        <ion-segment-button value="visits">
          <ion-label>Today's Visits</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
    <ion-content>
      <div v-if="selectedTab == 'orders'">

      
        <orders :data="todayOrders"/>
        
        <ion-button expand="block" color="medium" @click="openOrdersModal()">View All Orders</ion-button>
      </div>
      <div v-if="selectedTab == 'visits'">

        <visits :data="todayVisits"/>        
        <ion-button expand="block" color="medium" @click="openVisitsModal()">View All Visits</ion-button>
      </div>
      <ion-loading
      :is-open="openLoader"
      :duration="timeout"
      @onDidDismiss="setOpen(false)"
    />
    </ion-content>
    <ion-button @click="openContact(true)" expand="block" color="dark">Call Log</ion-button>
      
    <tabs />
  </ion-page>
</template>

<script>
import { IonContent, IonPage, /*IonModal,*/ modalController, IonSegment, IonSegmentButton, IonLoading } from '@ionic/vue';
// import { call, cart, trailSign, } from 'ionicons/icons';
import Contacts from '@/components/Contacts';
import Orders from '@/views/Sales/Orders/TodayOrders';
import Visits from '@/views/Sales/Visits/TodayVisits';

import AllOrders from '@/views/Sales/Orders';
import AllVisits from '@/views/Sales/Visits';
import DashboardSlideCards from './DashboardSlideCards';
import PageHeader from '@/components/Header';
import Tabs from '@/components/Tabs';
// Resource for API calls
import Resource from '@/api/resource';
export default {
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    // IonModal,
    IonSegment, IonSegmentButton,
    // IonIcon,
    DashboardSlideCards,
    IonLoading,
    // Timeline,
    PageHeader,
    // Contacts,
    Orders,
    Visits,
    Tabs,
  },
  data() {
    return {
      // call, cart, trailSign,
      selectedTab: 'orders',
      parent: 'dashboard',
      pageOption: 'dashboard',
      dashboardData: {
        customers: [],
        sales: 0,
        overdue: 0,
        debt: 0,
        today_orders: [],
        today_visits: [],
      },
      isOpenRef: false,
      openLoader: false,
    }
  },
  computed: {
    todayOrders() {
      return this.$store.getters.todayOrders
    },
    todayVisits() {
      return this.$store.getters.todayVisits
    }
  },
  created () {
    this.fetchDashboard();
    // this.fetchProducts();
  },
  methods: {
    fetchDashboard(){
      const app = this;
      // app.openLoader = true;
      // this.$store.dispatch('dashboard/fetchDashboardData', 'sales-rep')
      const fetchResource = new Resource('dashboard/sales-rep'); // enter the fetch customer url
      fetchResource.list()
      .then(response => {       
        app.dashboardData = response;
        app.$store.dispatch('orders/setTodayOrders', response.today_orders);
        app.$store.dispatch('visits/setTodayVisits', response.today_visits);
        // this.openLoader = false;
      });
  
    },
    displayParent(parent){
      // console.log(parent)
      this.pageOption = parent
    },
    changeTab(e) {
      // console.log('Segment changed', e);
      const app = this;
      app.selectedTab = e.detail.value;
    },
    async openContact() {
      //this.isOpenRef = value
      const modal = await modalController
        .create({
          component: Contacts,
          cssClass: 'my-custom-modal-css',
          backdropDismiss: false,
          showBackdrop: true,
          componentProps: {
            title: 'Call Log'
          },
        })
      return modal.present();
    },
    async openOrdersModal() {
      //this.isOpenRef = value
      const modal = await modalController
        .create({
          component: AllOrders,
          cssClass: 'my-custom-modal-css',
          backdropDismiss: false,
          showBackdrop: true,
          componentProps: {
            title: 'All Orders'
          },
        })
      return modal.present();
    },
    async openVisitsModal() {
      //this.isOpenRef = value
      const modal = await modalController
        .create({
          component: AllVisits,
          cssClass: 'my-custom-modal-css',
          backdropDismiss: false,
          showBackdrop: true,
          componentProps: {
            title: 'All Visits'
          },
        })
      return modal.present();
    },
    
    load(url) {
      const app = this;
      app.$router.push({ path: url });
    }
  },
};
</script>

<style scoped>
</style>