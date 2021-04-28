<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end" class="padded" @click="closeModal">
        <ion-icon :icon="i.closeOutline" size="large"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div v-if="call_logs.length > 0">
      <ion-list>
        <div class="card" v-for="(contact, index) in call_logs" :key="index">
          
          <ion-item lines="none">
            <img  slot="start" src="/assets/images/profile-image.png" width="50" alt="Contact">
            <div style="padding-top: 10px">
              <a @click="viewDetails(customer)">
                <strong v-if="contact['name']">{{contact['name']}}</strong>
                <strong v-else>{{contact['number']}}</strong>
                <p>
                  <small>
                    <ion-icon v-if="contact['type'] == 1" class="small" :icon="i.arrowDown"></ion-icon>
                    <ion-icon v-else class="small" :icon="i.arrowUp"></ion-icon>
                    {{contact['number']}} 
                    <p><small>{{ moment(contact['date']).format('MMM D, YYYY') }} | {{ callDuration(contact['duration'])}}</small></p>
                  </small>
                </p>
              </a>
            </div>
            <!-- <a class="bg-green call-button" slot="end" @click="callThisNumber(contact['number'])"> <ion-icon size="small" :icon="i.call"></ion-icon></a> -->
            <a class="bg-green call-button" slot="end" :href="'tel:' + contact['number']"> <ion-icon size="small" :icon="i.call"></ion-icon></a>
          </ion-item>
        </div>
      </ion-list>
    </div>
    <div v-else>
      <skeleton />
    </div>

  </ion-content>
  
</template>
<script>
import moment from 'moment';
import Skeleton from '@/components/Skeleton';
import { CallNumber } from '@ionic-native/call-number';
import { IonItem, IonIcon, modalController } from '@ionic/vue';
// import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { CallLog } from '@ionic-native/call-log';
export default {
  name: 'Contacts',
  props: {
    title: { type: String, default: 'Call Log' },
  },
  components: {
    IonItem, IonIcon, Skeleton
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
  created() {
    this.checkPermission()
    // this.getCallLog();
  },
  methods: {
    moment,
    setOpen(value){
      this.openLoader = value;
    },
    checkPermission() {
      var app = this;
      
      // app.setOpen(true);
      CallLog.hasReadPermission()
      .then(hasPermission => {
        if (!hasPermission) {
          app.getPermission();
          // this.getContacts()
          
        }else {
          app.getContacts();
        }
        
        app.setOpen(false);
      }).catch(error => {
        
        app.setOpen(false);
        console.log('Has Permission Error: ' + error);
      });     
      
    },
    getPermission() {
      var app = this;
      CallLog.requestReadPermission();
      setTimeout(() => {            
        app.checkPermission();
      }, 500);
    },
    getContacts() {
      var today = new Date();
      var yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 7);
      var fromTime = yesterday.getTime();
      const filters = [
        {
          name: "date",
          value: fromTime.toString(),
          operator: ">=",
        }
      ];
      CallLog.getCallLog(filters).then(results => {
        this.call_logs = results
        // this.setOpen(false);
      }).catch(error => {
        // this.setOpen(false);
        console.log('Get Contact Error: ' + error)
      });
    },
    callDuration(duration){
      return new Date(duration * 1000).toISOString().substr(11, 8); 
    },
    callThisNumber(number){
      CallNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    },
    async closeModal(){
      const modal = await modalController      
      return modal.dismiss();
    }
    
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
ion-content {
  --background: #fcfcfc;
}
ion-toolbar {
  --background: #000000;
  --color: #ffffff;
}
</style>