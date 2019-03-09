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
        class="not-shrink pb-2"
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
import { mapActions } from 'vuex'
import HorizontalImgList from '~/components/HorizontalImgList'

export default {
  key: '_id',

  components: {
    HorizontalImgList
  },

  data() {
    return {
      img: {}
    }
  },

  computed: {
    imgId() {
      return this.$route.params.id
    }
  },

  watch: {
    // eslint-disable-next-line prettier/prettier
    '$route': {
      handler(to, from) {
        this.img = {}
        ;(async () => {
          try {
            const res = await this.$api.getImageDetail(to.params.id)
            const result = res.data
            this.img = result.data
          } catch (err) {
            console.log(err)
          }
        })()
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
</style>
