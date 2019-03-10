<template>
  <div>
    <v-card 
      v-for="(album, id) in cachedList"
      :key="id"
      @click="viewAlbum(id)"
      class="pa-4 mb-4"
    >
      <h2 class="mb-2">
        {{ album.name }}
      </h2>

      <album-img-list :images="album.imgs" />
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AlbumImgList from '@/components/AlbumImgList'
import album from '@/utils/album'

export default {
  name: 'AlbumList',

  components: {
    AlbumImgList
  },

  data() {
    return {}
  },

  computed: {
    ...mapState(['images']),
    ...mapState('albums', ['savedList', 'cachedList'])
  },

  watch: {
    savedList: {
      async handler(newVal) {
        for (const albumId of Object.keys(newVal)) {
          if (!this.cachedList[albumId]) {
            const cachedList = await album.loadAlbum(
              this,
              newVal[albumId],
              this.images
            )
            this.setCachedList({ id: albumId, data: cachedList })
          }
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapMutations('albums', ['setCachedList']),
    viewAlbum(id) {
      this.$router.push({ path: `/albums/${id}` })
    }
  }
}
</script>
