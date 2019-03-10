<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
    >
      <h1 class="mb-2">
        ライブラリ
      </h1>
      <image-grid />
    </v-flex>
  </v-layout>
</template>

<script>
import ImageGrid from '~/components/ImageGrid'

export default {
  layout: 'with_bottomnav',
  components: {
    ImageGrid
  }
}
</script>
