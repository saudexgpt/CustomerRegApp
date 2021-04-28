<template>
  <ion-toolbar>
    <div class="tab-style">       
      <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="i.home"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="customers" href="/customers">
            <ion-icon :icon="i.peopleOutline"></ion-icon>
            <ion-label>Customers</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="schedule" href="/schedule">
            <ion-icon :icon="i.calendarOutline"></ion-icon>
            <ion-label>Schedule</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="notifications" href="/notifications">
            <ion-icon :icon="i.notificationsOutline"></ion-icon>
            <ion-label>Notification</ion-label>
            <ion-badge color="danger">6</ion-badge>
          </ion-tab-button>

          <!-- <ion-tab-button tab="more" @click="openPopover">
            <ion-icon :icon="i.ellipsisVerticalOutline"></ion-icon>
            <ion-label>More</ion-label>
          </ion-tab-button> -->
        </ion-tab-bar>
      </ion-tabs>
      <!-- <more-menu @logout="emitLogoutAction" /> -->
    </div>   
  </ion-toolbar>
</template>

<script>
import { IonToolbar, IonTabBar, IonTabButton,IonTabs,IonLabel/*, popoverController*/ } from '@ionic/vue';
// import { home, calendarOutline, logOutOutline, ellipsisVerticalOutline, notificationsOutline} from 'ionicons/icons';
import { defineComponent } from 'vue';
// import MoreMenu from './MoreMenu';
export default defineComponent({
  name: 'Tabs',
  components: { IonToolbar, IonTabBar, IonTabButton,IonTabs,IonLabel  },
  data() {
    return {
      
      isOpenRef: false
    }
  },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }
    return {
      beforeTabChange,
      afterTabChange,
    }
  },
  methods: {
    // async openPopover(e) {
    //   const popover = await popoverController
    //     .create({
    //       component: MoreMenu,
    //       cssClass: 'my-custom-class',
    //       event: e,
    //       componentProps: {
    //         onClick: () => {
    //           popover.dismiss();
    //         },
    //       },
    //       translucent: true,
    //       showBackdrop: false
    //     })
    //   return popover.present();
    // },
  },
});
</script>

<style scoped>
 /* ion-tab-bar {
   border-top-left-radius: 20px; 
   border-top-right-radius: 20px; 
 } */
</style>