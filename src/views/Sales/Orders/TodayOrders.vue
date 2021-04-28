<template>
  <ion-list v-if="data.length > 0">
    <order-element :data="data" />
  </ion-list>
  <ion-list v-else>
    <ion-item lines="none">
      <ion-icon  :icon="i.informationCircleOutline" />
      <ion-text color="danger">
        There are no orders today!
      </ion-text>
    </ion-item>
  </ion-list>
      
</template>
<script>
import { IonItem } from '@ionic/vue';
import OrderElement from './partials/OrderElement';
export default {
  components: {
    IonItem,
    OrderElement
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    } 
  },
  data() {
    return {
      permission: '',
      contacts: [],
      call_logs: [],
      listTyle: '',
      openLoader: false,
    }
  },
  methods: {
    setOpen(value){
      this.openLoader = value;
    },
  },

}
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
.small {
  font-size: 8px;
}
</style>