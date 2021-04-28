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
    <ion-list v-if="visits.length > 0">
      <visit-element :data="visits" />
    </ion-list>
    <ion-list v-else>
      <ion-item lines="none">
        <ion-icon  :icon="i.informationCircleOutline" />
        <ion-text color="danger">
          There are no visits today!
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
import VisitElement from './partials/VisitElement';
import { IonItem, IonLoading, modalController } from '@ionic/vue';
export default {
  components: {
    IonItem, VisitElement, IonLoading
  },
  props: {
    title: { type: String, default: 'All Visits' },
  },
  data() {
    return {
      permission: '',
      contacts: [],
      call_logs: [],
      listTyle: '',
      openLoader: false,
      visits: [],
    }
  },
  computed: {
  },  
  created() {
    this.fetchVisits()
  },
  methods: {
    setOpen(value){
      this.openLoader = value;
    },
    fetchVisits() {
      var app = this;
      app.openLoader = true;    
      app.$store.dispatch('visits/fetchVisits').then(response => {
        app.visits = response.visits;
        app.openLoader = false;
    
      });      
    },
    async closeModal() {
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
.small {
  font-size: 8px;
}
</style>