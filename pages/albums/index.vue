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
      <v-btn
        fab
        dark
        color="secondary"
        @click="addEmptyAlbum"
        class="fab"
      >
        <v-icon dark>
          add
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import AlbumList from '~/components/AlbumList'

export default {
  layout: 'with_bottomnav',

  components: {
    AlbumList
  },

  methods: {
    ...mapActions('albums', ['addEmptyAlbum'])
  }
}
</script>

<style lang="scss" scoped>
.fab {
  position: absolute;
  right: 16px;
  bottom: 36px;
}
</style>
