<template>
  <ion-page>
    <ion-slides pager="true" :options="slideOpts" class="padded">      
      <ion-slide>
        <div class="slide-badge bg-brown padded" @click="$router.push({path: '/customers'})">
          <ion-row>
            <ion-col size="1.3">
              <ion-icon size="large" :icon="i.peopleOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="6" >
              <ion-text>My Customers</ion-text><br>
              <span>{{ dashboardData.customers.length }}</span>
            </ion-col>
          </ion-row>    
        </div>
      </ion-slide>
      <ion-slide>
        <div class="slide-badge bg-blue padded">
          <ion-row>
            <ion-col size="1.3">
              <ion-icon size="large" :icon="i.swapHorizontalOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="6" >
              <ion-text>Total Sales</ion-text><br>
              <span>{{ dashboardData.sales }}</span>
            </ion-col>
          </ion-row>          
        </div>
      </ion-slide>
      <!-- <ion-slide>
        <div class="slide-badge bg-green padded">
          <ion-row>
            <ion-col size="1.3">
              <ion-icon size="large" :icon="i.cashOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="6" >
              <ion-text>Payments</ion-text><br>
              <span>9</span>
            </ion-col>
          </ion-row>          
        </div>
      </ion-slide>-->
      <ion-slide>
        <div class="slide-badge bg-magenta padded">
          <ion-row>
            <ion-col size="1.3">
              <ion-icon size="large" :icon="i.pricetagsOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="6" >
              <ion-text>Overdue Debt</ion-text><br>
              <span>{{ dashboardData.currency + ' ' + dashboardData.overdue }}</span>
            </ion-col>
          </ion-row>    
        </div>
      </ion-slide>
      <ion-slide>
        <div class="slide-badge bg-dark padded">
          <ion-row>
            <ion-col size="1.3">
              <ion-icon size="large" :icon="i.walletOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="6" >
              <ion-text>Total Debt</ion-text><br>
              <span>{{ dashboardData.currency + ' ' + dashboardData.debt }}</span>
            </ion-col>
          </ion-row>          
        </div>
      </ion-slide>
    </ion-slides>
  </ion-page>
</template>

<script>
import { IonSlides, IonSlide, IonIcon, IonText} from '@ionic/vue';
// import { cartOutline, peopleOutline, trailSignOutline } from 'ionicons/icons';
export default {
  name: 'DashboardSlideCards',
  components: { IonSlides, IonSlide, IonIcon, IonText },
  props: {
    dashboardData: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      // cartOutline, peopleOutline, trailSignOutline
    }
  },
  setup() {
    const slideOpts = {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // speed: 400
    };
    return { 
      slideOpts ,
    }
  },
  computed: {

    customers() {
      return this.$store.getters.customers
    },
    userData() {
      return this.$store.getters.userData
    }
  },
};
</script>

<style scoped>
.slide-badge {
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 10px 10px 10px 0;
  margin-bottom: 20px;
}

.slide-badge>ion-row {
  width:100%;
}
</style>