<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-row class="logo-badge">
        <ion-col>
          <div class="ion-text-center image-margin">
            <img :src="'assets/images/logo.png'"
              alt="App Logo"
              :width="'80'"
            />
            <ion-text color="light">
              <h3 class="page-tag">GPL SALES</h3>
            </ion-text>
          </div>
        </ion-col>
      </ion-row>
      <div class="ion-text-center login-panel ion-padding">
        <form @submit="submitCredentials">
          <ion-item>
            <ion-label position="floating">
              <ion-icon :icon="personOutline"></ion-icon> Email or Phone
            </ion-label>
            <ion-input type="text" v-model="loginForm.email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">
              <ion-icon :icon="keyOutline"></ion-icon> Password
            </ion-label>
            <ion-input type="password" v-model="loginForm.password" required></ion-input>
          </ion-item>
          <ion-button class="ion-margin-top" expand="full" shape="round" color="primary" type="submit"><ion-icon :icon="logInOutline"></ion-icon> Login</ion-button>
        </form>
        <ion-loading
          :is-open="isOpenRef"
          message="Authenticating..."
          :duration="timeout"
          @onDidDismiss="setOpen(false)"
        >
        </ion-loading>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonLabel, IonInput, IonItem, IonButton, IonLoading, toastController } from '@ionic/vue';
import { personOutline, keyOutline, logInOutline, } from "ionicons/icons";
export default {
  name: 'Login',
  components: {
    IonContent, IonPage, IonLabel, IonInput, IonItem, IonButton, IonLoading
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      isOpenRef: false,
    }
  },
  setup() {
    return {
      personOutline,
      keyOutline,
      logInOutline
    };
  },
  methods: {
    setOpen(value){
      this.isOpenRef = value;
    },
    async openToast(header, message, type) {
      const toast = await toastController
        .create({
          header: header,
          message: message,
          position: 'top',
          color: type,
          duration: 5000
        })
      return toast.present();
    },
    submitCredentials(e){
      e.preventDefault();      
      const app = this;
      app.setOpen(true);
      app.$store
        .dispatch('user/login', app.loginForm)
        .then(() => {
          app.loginForm =  {
            email: '',
            password: '',
          };
          // console.log(response);
          app.$router.push({ path: '/home' });
          // window.location = '/home';
          app.setOpen(false);
        })
        .catch((error) => {
          app.setOpen(false);
          let message = error.message;
          if (error.response) {
            
            if (error.response.data && error.response.data.messages) {
              message = error.response.data.messages;
            } else if (error.response.data && error.response.data.message) {
              message = error.response.data.message;
            }
          }
          app.openToast('', message, 'danger');
          console.log(message)
        });
    }
  },
}
</script>
<style scoped>
.logo-badge{
  background-image: linear-gradient(#198B1E, #1fd166, #198B1E);
  box-shadow: 0 2px 8px 0 #666;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 50px;
}
.image-margin {
  margin-top: 30px;

}
.page-tag {
  font-size: 30px;
  font-weight: 800;
  color: #ffffff;
}
</style>