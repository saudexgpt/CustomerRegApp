<template>
  <div>
    <!-- <div class="ion-padding custom-skeleton">
      <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
      <ion-skeleton-text animated></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 88%"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 70%"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
    </div> -->

    <ion-list>
      <!-- <ion-list-header>
        <ion-label>
          <ion-skeleton-text animated style="width: 20%"></ion-skeleton-text>
        </ion-label>
      </ion-list-header> -->
      <ion-item v-for="index in 5" :key='index'>
        <ion-avatar slot="start">
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-avatar>
        <ion-label>
          <h3>
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
          </h3>
          <p>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
          </p>
          <p>
            <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
          </p>
        </ion-label>
      </ion-item>
      <!-- <ion-item>
        <ion-thumbnail slot="start">
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-thumbnail>
        <ion-label>
          <h3>
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
          </h3>
          <p>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
          </p>
          <p>
            <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
          </p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-skeleton-text animated style="width: 27px; height: 27px" slot="start"></ion-skeleton-text>
        <ion-label>
          <h3>
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
          </h3>
          <p>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
          </p>
          <p>
            <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
          </p>
        </ion-label>
      </ion-item> -->
    </ion-list>
  </div>
</template>
<script>
import { 
  IonAvatar,
  IonItem, 
  IonLabel, 
  IonList, 
  // IonListHeader,
  IonSkeletonText,
  // IonThumbnail
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonAvatar,
    IonItem, 
    IonLabel, 
    IonList, 
    // IonListHeader,
    IonSkeletonText,
    // IonThumbnail
  },
});
</script>
<style scoped>
  /* Custom Skeleton Line Height and Margin */
  .custom-skeleton ion-skeleton-text {
    line-height: 13px;
  }

  .custom-skeleton ion-skeleton-text:last-child {
    margin-bottom: 5px;
  }
</style>