<template>
  <ion-page class="ion-page">   
    <page-header title="Sales" />
    <ion-content>
      {{ sales }}
    </ion-content>
    <tabs />
  </ion-page>  
</template>

<script>
import PageHeader from '@/components/Header.vue';
import { IonContent, IonPage } from '@ionic/vue';
import Tabs from '@/components/Tabs';
export default {
  name: 'Sales',
  components: {
    IonContent,
    IonPage,
    PageHeader,
    Tabs,
  },
  data() {
    return {
      customer: '',
    }
  },
  computed: {

    sales() {
      return this.$store.getters.sales
    },
    userData() {
      return this.$store.getters.userData
    }
  },
  created(){
    this.fetchSales();
  },
  methods: {
    fetchSales(){
      const app = this;
      app.$store.dispatch('sales/fetchSales');
    },
  },
};
</script>

<style scoped>
</style>