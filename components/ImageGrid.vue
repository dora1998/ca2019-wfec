<template>
  <v-container grid-list-sm fluid>
    <v-layout row wrap>
      <v-flex
        v-for="img in images"
        :key="img.id"
        xs4
        d-flex
      >
        <v-card flat tile class="d-flex">
          <v-img
            :src="img.url"
            aspect-ratio="1"
            class="grey lighten-2"
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ImageGrid',

  data() {
    return {
      images: []
    }
  },

  async mounted() {
    const res = await this.$api.getImageList(20, 0)
    const result = res.data
    this.images = result.data.images
  }
}
</script>
