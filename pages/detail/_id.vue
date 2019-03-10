<template>
  <v-layout
    column
    justify-center
    fill-height
  >
    <div class="back">
      <v-btn @click="viewImgList" flat icon>
        <v-icon large>
          chevron_left
        </v-icon>
      </v-btn>
    </div>
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

let img = {}
const infoLoaded = true

export default {
  key: '_id',

  components: {
    HorizontalImgList,
    ImageInfo
  },

  data() {
    return {
      img: img,
      infoLoaded: infoLoaded
    }
  },

  computed: {
    ...mapState(['images']),
    imgId() {
      return this.$route.params.id
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
    }
  },

  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
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
