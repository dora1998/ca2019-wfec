<template>
  <div>
    <v-card v-if="loaded.includes('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')" class="pa-4">
      <h2 class="mb-2">
        {{ cachedList['45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'].name }}
      </h2>

      <album-img-list :images="cachedList['45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'].imgs" />
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AlbumImgList from '@/components/AlbumImgList'
import album from '@/utils/album'

const ALBUM_ID = '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

export default {
  name: 'AlbumList',

  components: {
    AlbumImgList
  },

  data() {
    return {
      loaded: []
    }
  },

  computed: {
    ...mapState(['images']),
    ...mapState('albums', ['savedList', 'cachedList'])
  },

  async mounted() {
    const cachedList = await album.loadAlbum(
      this,
      this.savedList[ALBUM_ID],
      this.images
    )
    this.setCachedList({ id: ALBUM_ID, data: cachedList })
    this.loaded.push(ALBUM_ID)
  },

  methods: {
    ...mapMutations('albums', ['setCachedList'])
  }
}
</script>
