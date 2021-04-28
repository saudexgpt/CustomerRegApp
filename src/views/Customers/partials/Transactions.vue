<template>
  <div>
    <ion-list>
      <!-- <strong>Payment Summary</strong> -->
      <payment-summary :customer="customer" />
    </ion-list>
    <ion-list v-if="customer != null">
      <h4><ion-text class="padded" color="danger">Payment History</ion-text></h4>
      <div v-if="customer.payments.length > 0">
        <div class="card" v-for="(payment, index) in customer.payments" :key="index">          
          <ion-item lines="none">
            <div style="padding-top: 10px">
              <a @click="viewDetails(payment)">
                <strong>Invoice No.: {{ payment.transaction.invoice_no }}</strong>
                <p>
                  <small>
                    Date: {{moment(payment.created_at).format('MMM D, YYYY') }}
                  <p> 
                    Due Date: {{moment(payment.transaction.due_date).format('MMM D, YYYY')}} <br>
                    Sales: {{ (payment.transaction.staff) ? payment.transaction.staff.name: ''}}<br>
                    Confirmed By: {{ (payment.confirmer) ? payment.confirmer.name: ''}}
                    </p>
                  </small>
                </p>
              </a>
            </div>
            <strong slot="end"><ion-label color="success">{{currency + Number(payment.amount).toLocaleString() }}</ion-label></strong>
          </ion-item>
        </div>
      </div>
      <div v-else>
        <ion-item color="dark">
          <ion-icon  :icon="i.informationCircleOutline" />
          <ion-label>
            There are no payment histories
          </ion-label>
        </ion-item>
      </div>
    </ion-list>
  </div>
</template>

<script>
import moment from 'moment';
import PaymentSummary from './PaymentSummary';
import { IonItem } from '@ionic/vue';
// import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { PaymentSummary, IonItem },
  props: {
    customer: {
      type: Object,
      default: () => (null),
    },
  },
  data() {
    return { 
      
      currency: '₦',
      payments: [
        { id:1, invoice_no:'#253654', sales:'Farinto Michael', amount:250000, date:'2021-01-05', due_date: '2021-01-03'},{ id:1, invoice_no:'#253653', sales:'Farinto Michael', amount:100000, date:'2021-02-07', due_date: '2021-02-01'},{ id:1, invoice_no:'#253652', sales:'Farinto Michael', amount:150000, date:'2021-03-05', due_date: '2021-03-03'},{ id:1, invoice_no:'#253651', sales:'Farinto Michael', amount:50000, date:'2021-03-25', due_date: '2021-03-24'}
      ],
    };
  },
  methods: {
    moment
  },
});
</script>
<style scoped>
p{
  margin-top: 0;
}
.call-button {
  border-radius: 50%;
  padding: 5px;
  font-size: 5px;
}
</style>