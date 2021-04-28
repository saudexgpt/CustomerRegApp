<template>
  <div v-if="customers.length > 0">
    <ion-list>
      <div class="card" v-for="(customer, index) in customers" :key="index">
        
        <ion-item lines="none">
          <img  slot="start" :src="'/'+customer.photo" width="50" alt="Personnel">
          <div style="padding-top: 10px">
            <a @click="viewDetails(customer)">
              <strong>{{ customer.business_name }}</strong>
              <p>
                <small>
                  {{ customer.phone1 }} | {{ customer.phone2 }}
                  <p><small>{{ customer.address}}</small></p>
                </small>
              </p>
            </a>
          </div>
          <!-- <a class="bg-green call-button" slot="end" :href="'tel:' + customer.phone1"> <ion-icon size="small" :icon="i.call"></ion-icon></a> -->
        </ion-item>
      </div>
    </ion-list>
  </div>
  <div v-else>
    <skeleton />
  </div>
</template>
<script>
import Skeleton from '@/components/Skeleton';
import {IonItem} from '@ionic/vue';
// import { call } from 'ionicons/icons';
export default {
  components: {
    // IonIcon,
    IonItem,
    Skeleton,
    // IonInfiniteScroll, 
    // IonInfiniteScrollContent,
  },
  data() {
    return {
    }
  },
  computed: {

    customers() {
      return this.$store.getters.customers
    },
  },
  created () {
    // this.fetchCustomer();
  },
  methods: {
    async fetchCustomer(){
      await this.$store.dispatch('customers/fetchCustomers');
    },
    viewDetails(customer) {
      const app = this;
      app.$emit('viewDetails', customer);
    },
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