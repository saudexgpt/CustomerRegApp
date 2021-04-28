<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start" class="padded" @click="returnToParentPage()">
          <ion-icon :icon="i.arrowBack" size="large"></ion-icon>
        </ion-buttons>
        <ion-title>Customer Details</ion-title>   
      </ion-toolbar>
    </ion-header>
    <!-- <ion-item>
      <ion-toolbar>
        <a @click="returnToParentPage();"  slot="start"><ion-icon :icon="i.arrowBack" size="large"></ion-icon></a>
        <ion-buttons slot="end" class="padded" @click="returnToParentPage()">
          <ion-icon :icon="i.closeOutline" size="large"></ion-icon>
        </ion-buttons>
        <ion-title>Customer Details</ion-title>        
      </ion-toolbar>
    </ion-item> -->
    <ion-item>
      <img  class="padded" src="/assets/images/profile-image.png" width="90" alt="Image">
      <div align="left">          
        <small><h5>{{ customer.business_name }}</h5></small>
        <p>
          <small>
            <a :href="'tel:' + customer.phone1">{{ customer.phone1}}</a> | <a :href="'tel:' + customer.phone2">{{ customer.phone2}}</a>
            <!-- <p><small>{{ customer.address}}</small></p> -->
          </small>
        </p>
        <!-- <p>
          <a :href="'tel:' + customer.phone1"><ion-icon size="small" :icon="i.call"></ion-icon> {{ customer.phone1}}</a>
        </p> -->
      </div>
    </ion-item>
    <ion-segment @ionChange="segmentChanged($event)" scrollable="true" :value="selectedTab">
      <ion-segment-button value="Info">
        <small>Info</small>
      </ion-segment-button>
      <ion-segment-button value="Transactions">
        <small>Transactions</small>
      </ion-segment-button>
      <ion-segment-button value="ActivityLog">
        <small>Activity Log</small>
      </ion-segment-button>
    </ion-segment>
    <ion-content> 
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="i.arrowUp"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="tertiary"><ion-icon :icon="i.person" /></ion-fab-button>
          <ion-fab-button color="tertiary" @click="takeOrders()"><ion-icon :icon="i.cart" /></ion-fab-button>
          <ion-fab-button color="tertiary" :href="'tel:' + customer.phone1"><ion-icon :icon="i.call" /></ion-fab-button>
          
        </ion-fab-list>
      </ion-fab>
      <customer-info :customer="customer" v-if="selectedTab === 'Info'"/>
      <activity-log :customer="customer" v-if="selectedTab === 'ActivityLog'"/>
      <transactions :customer="customer" v-if="selectedTab === 'Transactions'"/>
    </ion-content>
  </ion-page>
</template>

<script>
// import Tabs from '@/components/Tabs'
import CustomerInfo from './partials/Info'
import ActivityLog from './partials/Activities'
import Transactions from './partials/Transactions'
import TakeOrders from './partials/TakeOrders'
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonIcon, IonFab, IonFabButton, modalController } from '@ionic/vue';

export default {
  name: 'CustomerDetails',
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
    parent: {
      type: String,
      default: () => (''),
    },
  },
  components: {    
    CustomerInfo,
    ActivityLog,
    Transactions,
    IonContent,
    IonPage,
    IonSegment, IonSegmentButton, IonIcon, IonFab, IonFabButton
  },
  data() {
    return {
      selectedTab: 'Info'
    };
  },
  methods: {
    returnToParentPage(){
      this.$emit('display', this.parent)
    },
    segmentChanged(ev) {
      // console.log('Segment changed', ev);
      this.selectedTab = ev.detail.value;
    },
    async takeOrders() {
      //this.isOpenRef = value
      const modal = await modalController
        .create({
          component: TakeOrders,
          cssClass: 'my-custom-modal-css',
          backdropDismiss: false,
          showBackdrop: true,
          componentProps: {
            title: 'New Orders',
            customerId: this.customer.id,
            customer: this.customer
          },
        })
      return modal.present();
    },
  },
};
</script>

<style scoped>

p{
  margin-top: -5px;
}
ion-header >ion-toolbar {
  --background: var(--ion-color-primary);
  --color: #ffffff;
}
</style>