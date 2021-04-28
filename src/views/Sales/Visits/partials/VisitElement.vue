<template>
  <ion-card v-for="(visit, index) in data" :key="index">
    <ion-card-header>
      <strong>{{ moment(visit.created_at).format('MMM D, YYYY')}}</strong>     
      <ion-card-title>{{ visit.customer.business_name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <table class="table table-striped">
        <thead>
          <tr>
            <th><small>#</small></th>
            <th><small>Purpose</small></th>
            <th><small>Description</small></th>
          </tr>            
        </thead>
        <tbody>
          <tr v-for="(detail, detail_index) in visit.details" :key="detail_index">
            <td><small>{{ detail_index + 1 }}</small></td>
            <td><small>{{ detail.purpose }}</small></td>
            <td><small>{{ detail.description }}</small></td>
          </tr>      
        </tbody>
      </table>
    </ion-card-content>
  </ion-card>
</template>
<script>
import moment from 'moment';
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    } 
  },
  data() {
    return {
      
    }
  },
  methods: {
    moment
  },
}
</script>