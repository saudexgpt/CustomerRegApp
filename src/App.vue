<template>
  <ion-app>
    
    <menu-bar />
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import MenuBar from '@/components/Menu'
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    MenuBar
  }
});
</script>