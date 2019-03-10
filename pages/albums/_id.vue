<template>
  <v-layout
    column
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
        <v-toolbar dark>
          <v-btn @click="viewAlbumList" icon>
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-toolbar-title>{{ albumData.name }}</v-toolbar-title>

          <v-spacer />
        </v-toolbar>

        <div class="pa-2">
          <album-grid :albumImgs="albumData.imgs" />
        </div>
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
    ...mapMutations('albums', ['setCachedList']),

    viewAlbumList() {
      this.$router.push({ path: '/albums' })
    }
  }
}
</script>

<style>
</style>
