<template>
  <ion-content>
    <ion-card>      
      <div class="padded">
        <table class="table">
          <tr>
            <td><strong>Region:</strong></td>
            <td>{{(customer.region) ? customer.region.name : ''}}</td>
          </tr>
          <tr>
            <td><strong>Sub-region:</strong></td>
            <td>{{(customer.sub_region) ? customer.sub_region.name : ''}}</td>
          </tr>
          <tr>
            <td><strong>Area:</strong></td>
            <td>{{customer.area}}</td>
          </tr>
          <tr>
            <td><strong>Street:</strong></td>
            <td>{{customer.street}}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td><small>{{customer.address}}</small></td>
          </tr>
        </table>
      </div>
    </ion-card>
    <ion-card>
      <div class="padded">
        <table class="table">
          <tr>
            <td><strong>Credit Limit:</strong></td>
            <td>{{(customer.credit_limit) ? customer.credit_limit: 'Not Set'}}</td>
          </tr>
          <tr>
            <td><strong>Yearly Target:</strong></td>
            <td>{{(customer.yearly_target) ? customer.yearly_target: 'Not Set'}}</td>
          </tr>
          <tr>
            <td><strong>Tier:</strong></td>
            <td>{{(customer.tier) ? customer.tier.name : ''}}</td>
          </tr>
          <tr>
            <td><strong>Customer Type:</strong></td>
            <td>{{(customer.customer_type) ? customer.customer_type.name : ''}}</td>
          </tr>
        </table>
      </div>
    </ion-card>
    <ion-card>
      <div class="padded">
        <table class="table">
          
          <tr>
            <td><strong>Registered By:</strong></td>
            <td>{{customer.registrar.name}}</td>
          </tr>
          <tr>
            <td><strong>Relating Officer:</strong></td>
            <td>{{ (customer.assigned_officer) ? customer.assigned_officer.name : 'Not Assigned'}}</td>
          </tr>
        </table>
      </div>
    </ion-card>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonCard, IonContent } from '@ionic/vue';
// import MapLocation from './Map';
export default defineComponent({
  components: { IonCard, IonContent /*MapLocation, IonItemDivider*/ },
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { };
  }
});
</script>
<style scoped>
</style>