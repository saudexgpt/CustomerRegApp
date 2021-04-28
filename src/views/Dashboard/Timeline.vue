<template>
  <!-- <ion-segment @ionChange="segmentChanged($event)" scrollable="true" :value="selectedTab">
    <ion-segment-button value="Info">
      <ion-label>Call Log</ion-label>
    </ion-segment-button>
    <ion-segment-button value="Transactions">
      <ion-label>Orders</ion-label>
    </ion-segment-button>
    <ion-segment-button value="ActivityLog">
      <ion-label>Visits</ion-label>
    </ion-segment-button>
    
  </ion-segment> -->
  <contacts />
</template>
<script>
import Contacts from '@/components/Contacts';
import { 
  // IonSegment, IonSegmentButton
} from '@ionic/vue';
import { } from 'ionicons/icons';
export default {
  props: {
    loadedAs: {
      type: String,
      default: 'full_page',
    }
  },
  components: {
    /*IonSegment, IonSegmentButton, */Contacts
  },
  data() {
    return {
    }
  },
  computed: {

    
  },
  created () {
    
  },
  methods: {
    segmentChanged(ev) {
      // console.log('Segment changed', ev);
      this.selectedTab = ev.detail.value;
    }
    // pushData (min, max){
    //   for (let i = min; i < max; i++) {
    //     this.customers.push(i);
    //   }
    // },
    // loadData (ev){      
    //   const max = this.customers.length;
    //   const min = 4;
    //   setTimeout(() => {
        
    //     // App logic to determine if all data is loaded
    //     // and disable the infinite scroll
    //     if (this.customers.length < max) {
    //       ev.target.disabled = true;
    //       this.isDisabled = true
    //     }else {
    //       this.pushData(min, max);
    //       console.log('Loaded data');
    //       ev.target.complete();

    //     }
    //   }, 500);
    // },
    // toggleInfiniteScroll() {
    //   this.isDisabled.value = !this.isDisabled.value;
    // }
  },
}
</script>
<style scoped>
ion-icon {
  color: #ffffff;
}
p{
  margin-top: 0;
}
.call-button {
  border-radius: 50%;
  padding: 5px;
  font-size: 5px;
}
</style>