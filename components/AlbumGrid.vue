<template>
  <v-container grid-list-sm fluid class="pa-0">
    <v-layout row wrap>
      <v-flex
        v-for="img in albumImgs"
        :key="img.id"
        xs4
        md2
        d-flex
      >
        <v-card flat tile class="d-flex">
          <v-img
            :src="img.url"
            @click="viewDetail(img.id)"
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
import { mapState } from 'vuex'

export default {
  name: 'AlbumGrid',

  props: {
    albumImgs: {
      default: () => [],
      type: Array
    }
  },

  computed: {
    ...mapState(['images'])
  },

  methods: {
    viewDetail(id) {
      this.$router.push({ path: `/detail/${id}` })
    }
  }
}
</script>
