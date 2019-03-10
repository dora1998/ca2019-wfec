<template>
  <v-app>
    <v-content>
      <v-container
        fill-height
        fluid
        class="mb-5"
      >
        <nuxt />
      </v-container>
    </v-content>
    <bottom-nav />
  </v-app>
</template>

<script>
import BottomNav from '~/components/BottomNav'

export default {
  components: {
    BottomNav
  }
}
</script>
