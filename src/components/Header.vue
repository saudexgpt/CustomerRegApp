<template>
  <ion-header :translucent="true">       
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <div class="nav-bar">
        <div class="padded"><strong>{{ title }}</strong></div>
      </div>
      <div slot="end">
        <ion-toolbar color="primary">
          <ion-tab-button>        
            <img class="padded" src="/img/icons/apple-touch-icon-60x60.png" alt="Image">
            <ion-badge color="success" v-if="connectMode === true"></ion-badge>
            <ion-badge color="danger" v-else></ion-badge>
          </ion-tab-button>
        </ion-toolbar>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonToolbar,} from '@ionic/vue';
// import { Plugins } from '@capacitor/core';
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: () => ('Dashboard')
    } 
  },
  components: {
    IonHeader,
    IonToolbar,
    
  },
  data() {
    return {
      // connectMode: null,
    }
  },
  computed: {
    connectMode() {
      // console.log('Connect is: ' + this.$store.getters.connectionMode)
      return this.$store.getters.connectionMode; //checkNetworkMode();
    }
  },
  methods: {
  },
}
</script>

<style scopped>
  .nav-bar {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  ion-badge {
    padding: 7px;
  }
</style>