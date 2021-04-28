<template>
  <div class="card" v-for="(order, index) in data" :key="index">
    <div @click="viewDetails(order)">
      <ion-item lines="none">
        <div style="padding-bottom: 10px">
          <h4><strong>{{ order.customer.business_name }}</strong></h4>
          <ion-text slot="end" color="primary"><strong>Amount: {{ currency + Number(order.amount_due).toLocaleString() }}</strong></ion-text><br>
            <small>Invoice: {{ order.invoice_no }}</small><br>
            <ion-text slot="end" color="danger"><small>{{ moment(order.created_at).format('MMM D, YYYY')}}</small></ion-text>
        </div>
      </ion-item>
    </div>
  </div>
  <!-- <ion-card v-for="(order, index) in data" :key="index">
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
  </ion-card> -->
</template>
<script>
import moment from 'moment';
import OrderDetails from './OrderDetails';
import { modalController } from '@ionic/vue';
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    } 
  },
  data() {
    return {
      currency: '₦'
    }
  },
  methods: {
    moment,
    async viewDetails(order) {
      const modal = await modalController
        .create({
          component: OrderDetails,
          cssClass: 'my-custom-modal-css',
          backdropDismiss: false,
          showBackdrop: true,
          componentProps: {
            order: order
          },
        })
      return modal.present();
    }
  },
}
</script>