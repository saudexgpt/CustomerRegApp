<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Add New Customer</ion-title>
        <ion-buttons slot="start" class="padded" @click="close()">
          <ion-icon :icon="i.arrowBack" size="large"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit="submitNewCustomer">
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.businessOutline" /> Business Name</ion-label>
          <ion-input v-model="form.business_name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.mailOutline" /> Email</ion-label>
          <ion-input v-model="form.email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.callOutline" /> Primary Phone No.</ion-label>
          <ion-input v-model="form.phone1" type="tel" maxlength="11" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.phonePortraitSharp" /> Alternative Phone No.</ion-label>
          <ion-input v-model="form.phone2" type="tel" maxlength="11"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.location" /> Address</ion-label>
          <ion-input v-model="form.address" required></ion-input>
        </ion-item>
        <!-- <ion-item>
          <ion-icon :icon="i.location" />
          <vue-google-autocomplete
            ref="address"
            id="map"
            classname="native-input sc-ion-input-md"
            placeholder="Enter Customer Address"
            v-on:placechanged="getAddressData"
          />
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.location" /> Address</ion-label>
          <ion-input v-model="form.address" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Street</ion-label>
          <ion-input v-model="form.street" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Area</ion-label>
          <ion-input v-model="form.area" readonly></ion-input>
        </ion-item> -->
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.accessibilityOutline" /> Customer Type</ion-label>
          <ion-select v-model="form.customer_type_id" placeholder="Select Customer Type">
            <ion-select-option v-for="(type, type_index) in customerTypes" :key="type_index" :value="type.id" >{{ type.name }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.apertureOutline" /> Tier</ion-label>
          <ion-select v-model="form.tier_id" placeholder="Select Tier">
            <ion-select-option v-for="(tier, tier_index) in tiers" :key="tier_index" :value="tier.id">{{ tier.name }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.wifi" /> Region</ion-label>
          <ion-select v-model="selected_region" @ionChange="loadSubRegion($event)" placeholder="Select Region">
            <ion-select-option v-for="(region, region_index) in regions" :key="region_index" :value="region" >{{ region.name }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><ion-icon slot="end" :icon="i.wifi" /> Sub-Region</ion-label>
          <ion-select v-model="form.sub_region_id" placeholder="Select Sub-Region">
            <ion-select-option v-for="(region, index) in sub_regions" :key="index" :value="region.id">{{ region.name }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-button type="submit" expand="block" shape="round">
          <ion-icon slot="start" :icon="i.saveOutline"></ion-icon> Save
        </ion-button>
      </form>
      <ion-loading
        :is-open="openLoader"
        message="Saving New Customer..."
        :duration="timeout"
        @onDidDismiss="openLoader = false"
      />
    </ion-content>
  </ion-page>
</template>
<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
import {IonInput, IonItem, IonSelect, IonSelectOption, IonIcon, IonButton, IonLoading} from '@ionic/vue';
// Resource for API calls
import Resource from '@/api/resource';
export default {
  name: 'AddCustomer',
  components: { IonInput, IonItem, IonSelect, IonSelectOption, IonIcon, IonButton, IonLoading, /*VueGoogleAutocomplete*/ },
  data() {
    return {
      form: {
        business_name: '',
        email: '',
        phone1: '',
        phone2: '',
        address: '',
        // street: '',
        // area: '',
        customer_type_id: '',
        tier_id: '',
        region_id: '',
        sub_region_id: '',
        // longitude: '',
        // latitude: ''
      },
      selected_region: '',
      sub_regions: [],
      openLoader: false,
      // customAlertOptions: {
      //   header: 'Pizza Toppings',
      //   subHeader: 'Select your toppings',
      //   message: '$1.00 per topping',
      //   translucent: true
      // }
    }
  },
  computed: {

    regions() {
      return this.$store.getters.regions
    },
    tiers() {
      return this.$store.getters.tiers
    },
    customerTypes() {
      return this.$store.getters.customerTypes
    },
  },
  methods: {
    
    close() {
      const app = this;
      app.$emit('display', 'customers_list');
    },
    // getAddressData: function (addressData, placeResultData) {
    //   // console.log(addressData)
    //   // console.log(placeResultData)
    //   // console.log(id)
    //   const app = this;
    //   app.form.address = placeResultData.formatted_address;
    //   app.form.street = addressData.route
    //   app.form.area = addressData.administrative_area_level_2;
    //   app.form.longitude = addressData.longitude
    //   app.form.latitude = addressData.latitude;
    // },
    loadSubRegion(value) {
      const app = this;
      const selected_region = value.target.value;
      app.sub_regions = selected_region.sub_regions;
      app.form.sub_region_id = '';
      if (selected_region.sub_regions.length > 0) {
        app.form.sub_region_id = app.sub_regions[0].id;
      }
      app.form.region_id = selected_region.id; 
    },
    submitNewCustomer(e){
      e.preventDefault();      
      const app = this;
      app.openLoader = true;
      const storeResource = new Resource('customers/store'); // enter the fetch orders url
      storeResource.store(app.form)
      .then(response => {
        app.$store.dispatch('customers/addNewCustomer', response.customer);
        app.openLoader = false;
        app.form = {
          business_name: '',
          email: '',
          phone1: '',
          phone2: '',
          address: '',
          customer_type_id: '',
          tier_id: '',
          region_id: '',
          sub_region_id: '',
        }
        app.close();
      })
        .catch((error) => {
         app.openLoader = false;
          let message = error.message;
          if (error.response) {
            
            if (error.response.data && error.response.data.messages) {
              message = error.response.data.messages;
            } else if (error.response.data && error.response.data.message) {
              message = error.response.data.message;
            }
          }
          // app.openToast('', message, 'danger');
          console.log(message)
        });
    }
  },
}
</script>
<style scoped>
p{
  margin-top: 0;
}
ion-content {
  --background: #fcfcfc;
}
</style>