<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{moment('2021-03-17').format('MMM D, YYYY') }}</ion-card-subtitle>
      <ion-card-title>Payment</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Details of activites go here...
      
      
      <ion-item lines="none">
        <small slot="end">
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          By Farinto Michael
        </small>
      </ion-item>
    </ion-card-content>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{moment('2021-03-15').format('MMM D, YYYY') }}</ion-card-subtitle>
      <ion-card-title>Sales</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Details of activites go here...
      
      
      <ion-item lines="none">
        <small slot="end">
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          By Farinto Michael
        </small>
      </ion-item>
    </ion-card-content>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{moment('2021-03-10').format('MMM D, YYYY') }}</ion-card-subtitle>
      <ion-card-title>Visit</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Details of activites go here...
      
      
      <ion-item lines="none">
        <small slot="end">
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          By Farinto Michael
        </small>
      </ion-item>
    </ion-card-content>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{moment('2021-03-09').format('MMM D, YYYY') }}</ion-card-subtitle>
      <ion-card-title>Visit</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Details of activites go here...
      
      
      <ion-item lines="none">
        <small slot="end">
          <ion-icon :icon="i.personOutline" slot="start"></ion-icon>
          By Farinto Michael
        </small>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script>
import moment from 'moment';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonItem } from '@ionic/vue';
// import { personOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonItem },
  
  data() {
    return {};
  },
  methods: {
    moment
  },
});
</script>