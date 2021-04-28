import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';

import { IonicVue } from '@ionic/vue';
import store from '@/store';
import '@/permission'; // permission control
// import '@/contactPicker';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import * as AllIcons from 'ionicons/icons'
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@/theme/variables.css';

import '@/registerServiceWorker'
// console.log(AllIcons);
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);
  
// registering icons globally 
app.mixin({
  data() {
    return {
      i: AllIcons,
    };
  },
  methods: {
    icon(name) {
      return this.i[name];
    }
  }
});
router.isReady().then(() => {
  app.mount('#app');
});