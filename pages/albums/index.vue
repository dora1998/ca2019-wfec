<template>
  <v-layout
    column
    justify-center
  >
    <v-flex
      xs12
      sm8
    >
      <h1 class="mb-2">
        アルバム
      </h1>
      <album-list />
    </v-flex>
  </v-layout>
</template>

<script>
import AlbumList from '~/components/AlbumList'

export default {
  layout: 'with_bottomnav',

  components: {
    AlbumList
  }
}
</script>
