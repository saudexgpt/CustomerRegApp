<template>
  <ion-page v-if="customer !== null">
    <ion-slides pager="true" :options="slideOpts" class="padded">      
      <ion-slide>
        <div class="slide-badge bg-blue padded">
          <ion-row>
            <ion-col size="1">
              <ion-icon size="large" :icon="i.walletOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="11" >
              <ion-text>Total Invoice Amount</ion-text><br>
              <span>{{currency + Number(total_invoice_amount).toLocaleString() }}</span>
            </ion-col>
          </ion-row>    
        </div>
      </ion-slide>
      <ion-slide>
        <div class="slide-badge bg-green padded">
          <ion-row>
            <ion-col size="1">
              <ion-icon size="large" :icon="i.cashOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="11" >
              <ion-text>Total Amount Paid</ion-text><br>
              <span>{{currency + Number(total_amount_paid).toLocaleString() }}</span>
            </ion-col>
          </ion-row>          
        </div>
      </ion-slide>
      <ion-slide>
        <div class="slide-badge bg-dark padded">
          <ion-row>
            <ion-col size="1">
              <ion-icon size="large" :icon="i.pricetagsOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="11" >
              <ion-text>Outstanding Debt</ion-text><br>
              <span>{{currency + Number(outstanding_debt).toLocaleString() }}</span>
            </ion-col>
          </ion-row>    
        </div>
      </ion-slide>
      <ion-slide>
        <div class="slide-badge bg-magenta padded">
          <ion-row>
            <ion-col size="1">
              <ion-icon size="large" :icon="i.cardOutline" ></ion-icon>              
            </ion-col>
            <ion-col size="11" >
              <ion-text>Debt Overdue</ion-text><br>
              <span>{{currency + Number(overdue_debt).toLocaleString() }}</span>
            </ion-col>
          </ion-row>    
        </div>
      </ion-slide>
    </ion-slides>
  </ion-page>
</template>

<script>
import { IonSlides, IonSlide, IonIcon, IonText} from '@ionic/vue';
export default {
  components: { IonSlides, IonSlide, IonIcon, IonText },
  props: {
    customer: {
      type: Object,
      default: () => (null),
    },
  },
  data() {
    return {
      currency: '₦',
      total_invoice_amount: 0,
      total_amount_paid: 0,
      outstanding_debt: 0,
      overdue_debt: 0,
    }
  },
  setup() {
    const slideOpts = {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 5,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // speed: 400
    };
    return { slideOpts }
  },
  created() {
    if (this.customer !== null) {
      this.calculateTotalInvoiceAmount(this.customer.transactions);
      this.calculateTotalAmountPaid(this.customer.payments)
    }
  },
  methods: {
    
    calculateTotalInvoiceAmount(transactions){
      const app =this;
      var total_invoice_amount = 0;
      var overdue_debt = 0;
      let today = new Date().toISOString().slice(0, 10)

      // console.log(today)
      transactions.forEach(transaction => {
        var date = transaction.due_date;
        if (date < today ) {
          overdue_debt += transaction.amount_due - transaction.amount_paid;
        }
        total_invoice_amount += transaction.amount_due;
      });
      app.overdue_debt = overdue_debt;
      app.total_invoice_amount =  total_invoice_amount;
    },
    calculateTotalAmountPaid(payments){
      const app =this;
      var total_amount_paid = 0;
      payments.forEach(payments => {
        total_amount_paid += payments.amount;
      });
      app.total_amount_paid =  total_amount_paid;
      app.calculateOutstandingDebt();
    },
    calculateOutstandingDebt(){
      const app =this;
      var outstanding_debt = app.total_invoice_amount - app.total_amount_paid;
      app.outstanding_debt =  outstanding_debt;
    }
  },
};
</script>

<style scoped>
.slide-badge {
  width: 100%;
  height: 80px;
  box-shadow: 0 2px 8px 0 #666;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>