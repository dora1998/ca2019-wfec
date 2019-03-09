<template>
  <v-container grid-list-sm fluid class="pa-0">
    <v-layout row wrap>
      <v-flex
        v-for="img in images"
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
      <div id="grid_bottom" />
      <v-flex xs12>
        <div v-if="loading" class="text-xs-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ImageGrid',

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState(['images', 'isLoadComplete'])
  },

  mounted() {
    this.setObserver()
  },

  methods: {
    ...mapActions(['fetchImgList']),

    viewDetail(id) {
      this.$router.push({ path: `/detail/${id}` })
    },

    setObserver() {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(async entry => {
            if (this.isLoadComplete) return
            if (entry.intersectionRatio !== 0) {
              this.loading = true
              await this.fetchImgList(this.images.length)
              this.loading = false
            }
          })
        },
        {
          threshold: [0]
        }
      )
      const bottomDom = document.querySelector('#grid_bottom')
      observer.observe(bottomDom)
    }
  }
}
</script>
