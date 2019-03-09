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
      class="pa-0"
    >
      <v-flex
        xs10
        align-center
        class="not-shrink pb-2 img_container"
      >
        <v-img
          :src="img.url"
          height="100%"
          contain
          aspect-ratio="2"
        >
          <template v-slot:placeholder>
            <v-layout
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-5" />
            </v-layout>
          </template>
        </v-img>
        <image-info :img="img" v-if="infoLoaded" />
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

export default {
  key: '_id',

  components: {
    HorizontalImgList,
    ImageInfo
  },

  data() {
    return {
      img: {},
      infoLoaded: false
    }
  },

  computed: {
    ...mapState(['images']),
    imgId() {
      return this.$route.params.id
    }
  },

  watch: {
    // eslint-disable-next-line prettier/prettier
    '$route': {
      handler(to, from) {
        this.infoLoaded = false

        const imgIds = this.images.map(img => img.id)
        if (imgIds.includes(to.params.id)) {
          this.img = this.images[imgIds.indexOf(to.params.id)]
          this.infoLoaded = true
        } else {
          this.img = {}
          ;(async () => {
            try {
              const res = await this.$api.getImageDetail(to.params.id)
              const result = res.data
              this.img = result.data
              this.infoLoaded = true
            } catch (err) {
              console.log(err)
            }
          })()
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(['fetchImgList']),
    viewAnotherImage(id) {
      this.$router.push({ name: 'detail-id', params: { id } })
    },
    viewImgList() {
      this.$router.push({ path: '/' })
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
.img_container {
  position: relative;
}
</style>
