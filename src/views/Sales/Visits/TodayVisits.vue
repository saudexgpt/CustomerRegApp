<template>
  <ion-list v-if="data.length > 0">
    <visit-element :data="data" />
  </ion-list>
  <ion-list v-else>
    <ion-item lines="none">
      <ion-icon  :icon="i.informationCircleOutline" />
      <ion-text color="danger">
        There are no visits today!
      </ion-text>
    </ion-item>
  </ion-list>
</template>
<script>
import VisitElement from './partials/VisitElement';
import { IonItem } from '@ionic/vue';
export default {
  components: {
    IonItem, VisitElement
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
.small {
  font-size: 8px;
}
</style>