<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end" class="padded" @click="closeModal">
        <ion-icon :icon="i.closeOutline" size="large"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <ion-fab vertical="top" horizontal="center" edge slot="fixed">
      <ion-fab-button color="tertiary" @click="addLine()">
        <ion-icon :icon="i.add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-card color="medium" v-for="(invoice_item, index) in invoice_items" :key="index">      
      <ion-item>
        <ion-label position="floating">Products</ion-label>
        <ion-select v-model="invoice_item.product_index" @ionChange="fetchItemDetails(index)" placeholder="Select product" interface="action-sheet">
          <ion-select-option v-for="(product, product_index) in products" :key="product_index" :value="product_index" >{{ product.name }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item v-if="invoice_item.item_id !== ''">
        <ion-toolbar>
          <ion-label position="stacked">Quantity</ion-label>
          <input v-model="invoice_item.quantity" @input="calculateTotal(index)" type="number" placeholder="Enter Quantity" min="1" required>
          <ion-label slot="end">{{ invoice_item.type }}</ion-label>
        </ion-toolbar>
      </ion-item>
      <ion-item v-if="invoice_item.item_id !== ''">
        <ion-toolbar>
          <ion-label position="stacked">Rate</ion-label>
          <input v-model="invoice_item.rate" @input="calculateTotal(index)" type="number" placeholder="Enter Rate" min="1" required>
          <ion-label slot="end">NGN</ion-label>
        </ion-toolbar>
      </ion-item>
      <ion-item lines="none">
        <ion-toolbar>
          <ion-label><strong>Amount:</strong> {{ Number(invoice_item.amount).toLocaleString() }} NGN</ion-label>
          <ion-item v-if="invoice_items.length > 1" slot="end">
          
              <a @click="removeLine(index)" ><ion-icon :icon="i.trashOutline" style="color: brown" /></a>
          </ion-item>
      
        </ion-toolbar>
      </ion-item>
    </ion-card>
    <!-- </form> -->
    <ion-toast
      :is-open="fill_fields_error"
      message="Kindly fill all empty fields"
      :duration="3000"
      position="middle"
      header="Empty field"
      @onDidDismiss="setOpen(false)"
    />
  </ion-content>
  <ion-footer>
    <ion-radio-group value="now" @ionChange="form.payment_mode = $event.target.value">
      <ion-list-header>
        <ion-label>Payment Mode</ion-label>
      </ion-list-header>
      <ion-toolbar>
        
        <ion-item lines="none">
          <ion-label>Pay Now</ion-label>
          <ion-radio slot="start" value="now"></ion-radio>
        </ion-item>

        <ion-item slot="end" lines="none">
          <ion-label>Pay Later</ion-label>
          <ion-radio slot="start" value="later"></ion-radio>
        </ion-item>
      </ion-toolbar>
    </ion-radio-group>
    <ion-item v-if="form.payment_mode == 'later'">
      <ion-label position="floating">Payment Due Date</ion-label>
      <ion-datetime @ionChange="form.due_date = $event.target.value" display-format="YYYY-MM-DD" :min="minDate()" :max="maxDate()"></ion-datetime>
    </ion-item>
    <div class="padded">
      <hr>    
      <ion-text color="primary"><strong>Grand Total: </strong>₦{{ Number(form.amount).toLocaleString() }}</ion-text>
    </div>
    <ion-button color="primary" @click="confirmSubmit()" expand="full" shape="round">Submit Order</ion-button>
  </ion-footer>
</template>
<script>
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, modalController, IonFab, IonFabButton, IonIcon, IonToast, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonDatetime, alertController } from '@ionic/vue';
import Resource from '@/api/resource';
export default {
  name: 'AddNewOrder',
  props: {
    customerId: { type: Number, default: null },
    customer: { type: Object, default: null },
    title: { type: String, default: 'Take Orders' },
  },
  components: { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonToast, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonDatetime },

  data() {
    return {
      pickerOptions: {
        disabledDate(date) {
          var d = new Date(); // today
          d.setDate(d.getDate()); // one year from now
          return date > d;
        },
      },
      upload_type: 'normal',
      params: {},
      customers: [],
      customer_types: [],
      items_in_stock_dialog: false,
      dialogFormVisible: false,
      userCreating: false,
      fill_fields_error: false,
      show_product_list: false,
      batches_of_items_in_stock: [],
      form: {
        payment_mode: 'now',
        customer_id: this.customerId,
        status: 'pending',
        subtotal: 0,
        discount: 0,
        amount: 0,
        notes: '',
        due_date: this.minDate(),
        invoice_items: [
          {
            item_id: '',
            quantity: 1,
            rate: 0,
            tax: null,
            type: '',
            total: 0,
            batches: [],
            batches_of_items_in_stock: [],
          },
        ],
      },
      invoice_items: [],
      discount_rate: 0,
    };
  },
  computed: {

    products() {
      return this.$store.getters.products
    },
  },
  watch: {
    invoice_items() {
      this.blockRemoval = this.invoice_items.length <= 1;
    },
  },
  mounted() {
    this.addLine();
  },
  methods: {
    closeModal(){
      modalController.dismiss();
    },
    minDate(){
      return new Date().toISOString().substr(0, 10)
    },
    maxDate(){
      var today = new Date();
      var future_date = new Date(today);
      future_date.setDate(today.getDate() + 30); // 30 days from now
      return future_date.toISOString().substr(0, 7);
    },
    setOpen(value){
      const app = this;
      app.fill_fields_error = value;
    },
    addLine() {
      this.setOpen(false);

      const checkEmptyLines = this.invoice_items.filter(
        (detail) =>
          detail.item_id === '' ||
          detail.quantity === '' ||
          detail.total === 0
      );

      if (checkEmptyLines.length >= 1 && this.invoice_items.length > 0) {
        this.setOpen(true);
        // this.invoice_items[index].seleted_category = true;
        return;
      } else {
        this.invoice_items.unshift({
          product_index: null,
          item_id: '',
          quantity: 1,
          type: 'Package',
          rate: 0,
          amount: 0,
        });
      }
      // this.scrollToBottom();
    },
    removeLine(detailId) {
      this.setOpen(false);
      if (!this.blockRemoval) {
        this.invoice_items.splice(detailId, 1);
        this.calculateTotal(null);
      }
    },
    async confirmSubmit() {
      const app = this;
      const checkEmptyLines = this.invoice_items.filter(
        (detail) =>
          detail.item_id === '' ||
          detail.quantity === ''
      );
      app.setOpen(false);
      if (checkEmptyLines.length == 0 && this.invoice_items.length > 0) {
        const payment_mode = app.form.payment_mode;
        var message = 'Are you sure you want to submit this order?';
        var text = "Yes";
        if (payment_mode == 'now') {
          text = "Payment Received";
          message = "You have set payment mode to 'Pay Now'. Make sure you have received ₦" + Number(app.form.amount).toLocaleString() + " before submitting."
        }
        const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Attention!!!',
            message: message,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
                  console.log('Confirm Cancel:', blah)
                },
              },
              {
                text: text,
                handler: () => {
                  app.submitOrders();
                  console.log('Confirm Okay')
                },
              },
            ],
          });
        return alert.present();
      } else {
        app.setOpen(true);
      }
    },
    submitOrders() {
      const app = this;
      const storeOrderResource = new Resource('sales/store');
      var form = app.form;
      
      
      // const load = storeOrderResource.loaderShow();
      form.invoice_items = app.invoice_items;
      // console.log(form);
      storeOrderResource
        .store(form)
        .then((response) => {
          // console.log(response)
          // eslint-disable-next-line vue/no-mutating-props
          app.customer.transactions.push(response.transaction);
          // eslint-disable-next-line vue/no-mutating-props
          app.customer.payments.concat(response.transaction.payments);
          app.$store.dispatch('orders/addOrder', response.transaction);
          // app.$message({
          //   message: 'Invoice Created Successfully!!!',
          //   type: 'success',
          // });
          app.closeModal();
        })
        .catch((error) => {
          console.log(error.message);
        });
      
    },
    fetchItemDetails(index) {
      const app = this;
      const product_index = app.invoice_items[index].product_index;
      // console.log(index)
      const item = app.products[product_index];
      if (item != null) {
        app.invoice_items[index].rate = (app.invoice_items[index].rate) ? app.invoice_items[index].rate : item.price.sale_price;
        app.invoice_items[index].item_id = item.id;
        app.invoice_items[index].quantity = (app.invoice_items[index].quantity) ? app.invoice_items[index].quantity : 1;
        app.invoice_items[index].type = item.package_type;
        app.invoice_items[index].quantity_per_carton = item.quantity_per_carton;
        app.invoice_items[index].no_of_cartons = 0;
        // let tax = 0;
        // for (let a = 0; a < item.taxes.length; a++) {
        //   tax += parseFloat(item.taxes[a].rate);
        // }
        // app.invoice_items[index].tax = tax;
        app.calculateTotal(index);
      }
      
    },
    showItemsInStock(index) {
      const app = this;
      app.batches_of_items_in_stock =
        app.invoice_items[index].batches_of_items_in_stock;
      app.items_in_stock_dialog = true;
    },
    calculateNoOfCartons(index) {
      const app = this;
      if (index !== null) {
        const quantity = app.invoice_items[index].quantity;
        const quantity_per_carton =
          app.invoice_items[index].quantity_per_carton;
        if (quantity_per_carton > 0) {
          const no_of_cartons = quantity / quantity_per_carton;
          app.invoice_items[index].no_of_cartons = no_of_cartons; // + parseFloat(tax);
        }
      }
    },
    calculateTotal(index) {
      const app = this;
      // Get total amount for this item without tax
      if (index !== null) {
        const quantity = app.invoice_items[index].quantity;
        const unit_rate = app.invoice_items[index].rate;
        app.invoice_items[index].amount = parseFloat(
          quantity * unit_rate
        ).toFixed(2); // + parseFloat(tax);
      }
      // we now calculate the running total of items invoiceed for with tax //////////
      // let total_tax = 0;
      let subtotal = 0;
      for (let count = 0; count < app.invoice_items.length; count++) {
        // const tax_rate = app.invoice_items[count].tax;
        // const quantity = app.invoice_items[count].quantity;
        // const unit_rate = app.invoice_items[count].rate;
        // total_tax += parseFloat(tax_rate * quantity * unit_rate);
        subtotal += parseFloat(app.invoice_items[count].amount);
      }
      // app.form.tax = total_tax.toFixed(2);
      app.form.subtotal = subtotal.toFixed(2);
      app.form.discount = parseFloat(
        (app.discount_rate / 100) * subtotal
      ).toFixed(2);
      // subtract discount
      app.form.amount = parseFloat(subtotal - app.form.discount).toFixed(2);
    },
    getContent() {
      console.log(document.querySelector('ion-content'))
      return document.querySelector('ion-content');
    },
    scrollToBottom() {
      this.getContent().scrollToBottom();
    }
  },
};
</script>
<style scoped>
input {
    border: none transparent;
    outline: none;
    padding-top: 10px;
    background: transparent;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #333 !important;
  opacity: 0.5 !important; /* Firefox */
}

</style>