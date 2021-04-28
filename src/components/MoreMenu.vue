<template>
  <ion-content>
    <ion-item button>
      <ion-label>
        <ion-icon :icon="i.personOutline"></ion-icon> Profile
      </ion-label>
    </ion-item>
    <ion-item  button @click="logout">
      <ion-label>
        <ion-icon :icon="i.logOutOutline"></ion-icon> Logout
      </ion-label>
    </ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonLabel, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Popover',
  components: { IonContent, IonLabel, IonItem },
  setup() {
    return {
    }
  },
  methods: {
    
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push({ path: 'login' });
      // window.location = '/';
    },
  },
});
</script>