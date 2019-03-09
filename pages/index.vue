<template>
  <v-layout
    column
    justify-center
  >
    <v-flex
      xs12
      sm8
    >
      <image-grid />
    </v-flex>
  </v-layout>
</template>

<script>
import ImageGrid from '~/components/ImageGrid'

export default {
  components: {
    ImageGrid
  }
}
</script>
