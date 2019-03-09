<template>
  <v-layout
    column
    justify-center
    fill-height
  >
    <v-layout
      xs12
      column
    >
      <v-flex
        xs10
      >
        <v-img
          :src="img.url"
          height="100%"
          max-height="calc((100vh - 48px) / 12 * 10 - 96px)"
          contain
        />
      </v-flex>
      <v-flex
        xs2
      >
        <horizontal-img-list
          :images="images" 
          @click_img="viewAnotherImage"
        />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HorizontalImgList from '~/components/HorizontalImgList'

export default {
  components: {
    HorizontalImgList
  },

  data() {
    return {
      img: {}
    }
  },

  computed: {
    ...mapState(['images']),
    imgId() {
      return this.$route.params.id
    }
  },

  async mounted() {
    if (this.images.length === 0) {
      this.fetchImgList(0)
    }
    try {
      const res = await this.$api.getImageDetail(this.imgId)
      const result = res.data
      this.img = result.data
    } catch (err) {
      console.log(err)
    }
  },

  methods: {
    ...mapActions(['fetchImgList']),
    viewAnotherImage(id) {
      this.$router.push({ path: `/detail/${id}` })
    }
  },

  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
</script>
