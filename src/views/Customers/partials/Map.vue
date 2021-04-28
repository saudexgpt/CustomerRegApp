<template>
  <GoogleMap
  api-key="AIzaSyCORGP_nMDblbbNkLXxGDBzQ0EOjO_CEpQ"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 6.5244, lng: 3.3792 }

    return { center }
  },
})
</script>
