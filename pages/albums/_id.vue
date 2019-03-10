<template>
  <v-layout
    column
    justify-center
  >
    <v-flex
      xs12
      sm8
    >
      <template
        v-if="!albumData"
      >
        <h1>
          アルバムが存在しません
        </h1>
      </template>
      <template v-else>
        <h1 class="mb-2">
          {{ albumData.name }}
        </h1>
        <album-grid :albumImgs="albumData.imgs" />
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import album from '~/utils/album'
import { mapState, mapMutations } from 'vuex'
import AlbumGrid from '~/components/AlbumGrid'

export default {
  components: {
    AlbumGrid
  },

  data() {
    return {}
  },

  computed: {
    ...mapState(['images']),
    ...mapState('albums', ['savedList', 'cachedList']),
    albumData() {
      return this.cachedList[this.$route.params.id]
    }
  },

  watch: {
    $route: {
      async handler(newVal) {
        const albumId = newVal.params.id
        if (!this.cachedList[albumId]) {
          const cachedList = await album.loadAlbum(
            this,
            this.savedList[albumId],
            this.images
          )
          this.setCachedList({ id: albumId, data: cachedList })
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapMutations('albums', ['setCachedList'])
  }
}
</script>

<style>
</style>
