<template>
  <v-layout
    column
    justify-center
    fill-height
  >
    <v-toolbar dark>
      <v-btn @click="viewImgList" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{ img.title }}</v-toolbar-title>

      <v-spacer />

      <v-btn @click="openBottomSheet" icon>
        <v-icon>library_add</v-icon>
      </v-btn>
    </v-toolbar>

    <album-select-sheet :showProp.sync="show" :selected.sync="selected" />

    <v-layout
      xs12
      column
      class="pa-0 content_container"
    >
      <v-flex
        xs10
        align-center
        class="not-shrink pb-2 img_container"
      >
        <div
          v-lazy:background-image="img.url"
          :key="'img_' + img.url"
          class="img"
        >
          <v-layout
            fill-height
            align-center
            justify-center
            ma-0
            class="loading_circle"
          >
            <v-progress-circular :size="96" :width="5" color="primary" indeterminate />
          </v-layout>
          <image-info :img="img" v-if="infoLoaded" />
        </div>
      </v-flex>
      <v-flex
        xs2
        class="not-shrink"
      >
        <horizontal-img-list
          :selected="imgId"
          @click_img="viewAnotherImage"
        />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import HorizontalImgList from '~/components/HorizontalImgList'
import ImageInfo from '~/components/ImageInfo'
import AlbumSelectSheet from '~/components/AlbumSelectSheet'

let img = {}
const infoLoaded = true

export default {
  key: '_id',

  components: {
    HorizontalImgList,
    ImageInfo,
    AlbumSelectSheet
  },

  data() {
    return {
      img: img,
      infoLoaded: infoLoaded,
      show: false,
      selected: null
    }
  },

  computed: {
    ...mapState(['images']),
    imgId() {
      return this.$route.params.id
    }
  },

  watch: {
    show(newVal) {
      if (newVal === true || this.selected === null) return
      this.addImgToAlbum({ albumId: this.selected, image: this.img })
    }
  },

  async beforeRouteUpdate(to, from, next) {
    img = await this.loadImage(to.params.id)
    next()
  },

  mounted() {
    this.loadImage(this.$route.params.id)
  },

  methods: {
    ...mapActions(['fetchImgList']),
    ...mapActions('albums', ['addImgToAlbum']),

    viewAnotherImage(id) {
      this.$router.push({ name: 'detail-id', params: { id } })
    },
    viewImgList() {
      this.$router.push({ path: '/' })
    },

    async loadImage(id) {
      const imgIds = this.images.map(img => img.id)
      if (imgIds.includes(id)) {
        this.img = this.images[imgIds.indexOf(id)]
        return this.img
      } else {
        this.img = {}
        try {
          const res = await this.$api.getImageDetail(id)
          const result = res.data
          this.img = result.data
          return this.img
        } catch (err) {
          console.log(err)
        }
      }
    },

    openBottomSheet() {
      this.show = true
      this.selected = null
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 999;
}
.not-shrink {
  flex-shrink: 0;
}
.content_container {
  height: 100%;
}
.img_container {
  position: relative;

  .img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;

    &[lazy='loading'] .loading_circle {
      visibility: visible;
    }
  }
  img[lazy='error'] {
    // TODO: エラー時のスタイル
  }
  .loading_circle {
    visibility: hidden;
  }
}
</style>
