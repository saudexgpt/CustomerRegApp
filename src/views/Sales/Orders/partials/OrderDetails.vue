<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Order Details</ion-title>
      <ion-buttons slot="end" class="padded" @click="closeModal">
        <ion-icon :icon="i.closeOutline" size="large"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <ion-card-header>
        <ion-toolbar>        
          <strong>Invoice: {{ order.invoice_no }}</strong>         
          <ion-text slot="end" color="danger">{{ moment(order.created_at).format('MMM D, YYYY')}}</ion-text>
        </ion-toolbar>
        <ion-card-title>{{ order.customer.business_name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <table class="table table-striped">
          <thead>
            <tr>
              <th><small>#</small></th>
              <th><small>Item</small></th>
              <th><small>Qty</small></th>
              <th><small>Rate</small></th>
              <th><small>Amt</small></th>
            </tr>            
          </thead>
          <tbody>
            <tr v-for="(detail, detail_index) in order.details" :key="detail_index">
              <td><small>{{ detail_index + 1 }}</small></td>
              <td><small>{{ detail.product }}</small></td>
              <td><small>{{ detail.quantity + ' ' + detail.packaging }}</small></td>
              <td><small>{{ currency + Number(detail.rate).toLocaleString() }}</small></td>
              <td><small>{{ currency + Number(detail.amount).toLocaleString() }}</small></td>
            </tr>
            <tr>
              <td colspan="4"><strong>Grand Total</strong></td>
              <td><strong align="right">{{ currency + Number(order.amount_due).toLocaleString() }}</strong></td>
            </tr>       
          </tbody>
        </table>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>
<script>
import moment from 'moment';
import { modalController } from '@ionic/vue';
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currency: '₦'
    }
  },
  methods: {
    moment,
    async closeModal() {
      const modal = await modalController      
      return modal.dismiss();
    }
  },
}
</script>