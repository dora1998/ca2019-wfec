<template>
  <v-layout
    column
    justify-center
    fill-height
  >
    <v-flex
      xs12
    >
      <v-img
        :src="img.url"
        height="100%"
        contain
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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

  async mounted() {
    const res = await this.$api.getImageDetail(this.imgId)
    const result = res.data
    this.img = result.data
  },

  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
</script>
