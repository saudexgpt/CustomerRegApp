<template>
  <ion-menu side="start" menu-id="custom" class="my-custom-menu" content-id="main">
    <ion-content >
      <ion-item lines="none">
        
        
        
        <ion-toolbar>
          
          <div slot="start">
            <img  src="/assets/images/profile-image.png" width="70" alt="Image">
          </div>
          <div >
            <strong><ion-text color="primary">{{ userData.name }}</ion-text></strong>
            <br><small>{{ userData.email }}</small>
            <br><small>{{ userData.phone }}</small>
          </div>
          
        
        </ion-toolbar>
      </ion-item>
      <ion-item-divider />
      <ion-list>
        <div v-for="(route, index) in privilegedRoutes" :key="index">
          
          <ion-item lines="none" @click="loadPage(route.path)">
            <ion-icon slot="start" :src="icon(route.meta.icon)"></ion-icon>       
            <ion-label>{{ route.meta.title }}</ion-label>
          </ion-item>
        </div>
        <!-- <ion-item lines="none">
          <ion-icon slot="start" :icon="i.giftOutline"></ion-icon>          
          <ion-label>Deliveries</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.cashOutline"></ion-icon>          
          <ion-label>Payments</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.trailSignOutline"></ion-icon>          
          <ion-label>Visit Reports</ion-label>
        </ion-item> -->
        <ion-item-divider />
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.albumsOutline"></ion-icon>          
          <ion-label>Inventory</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.syncOutline"></ion-icon>          
          <ion-label>Data Synchronization</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.cloudDownloadOutline"></ion-icon>          
          <ion-label>Download & Refresh</ion-label>
        </ion-item>
        <ion-item-divider />
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.personOutline"></ion-icon>          
          <ion-label>My Profile</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="i.informationCircleOutline"></ion-icon>          
          <ion-label>About App</ion-label>
        </ion-item>
        <ion-item lines="none" button @click="logout">
          <ion-icon slot="start" :icon="i.logOutOutline"></ion-icon>          
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-router-outlet id="main"></ion-router-outlet>
</template>
<style>
.my-custom-menu {
  --width: 300px;
}
</style>

<script>
import {
  IonIcon,
  IonContent,
  IonItem, 
  IonList, 
  IonMenu, 
  IonRouterOutlet,
  menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonIcon,
    IonContent,
    IonItem, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
  },
  data() {
    return {
    }
  },
  computed: {
    userData(){
      return this.$store.getters.userData;
    },
    privilegedRoutes(){
      return this.$store.getters.permissionRoutes;
    },
  },
  created() {
    // console.log(this.i)
  },
  methods: {
    openCustom() {
      menuController.enable(true, 'custom');
      menuController.open('custom');
    },

    loadPage(url) {
      menuController.toggle();
      this.$router.push({ path: url });
    },
    async logout() {
      menuController.toggle();
      await this.$store.dispatch('user/logout');
      this.$router.push({ path: 'login' });
      // window.location = '/';
    },
  }
});
</script>