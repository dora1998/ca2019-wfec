<template>
  <div ref="container" class="horizontal_container">
    <v-img
      v-for="img in filteredImgs"
      :key="img.id"
      :ref="img.id"
      :src="img.url"
      @click="$emit('click_img', img.id)"
      class="mini_img"
      aspect-ratio="1" 
    >
      <div
        v-if="img.id === selected"
        class="fill-height selected"
      />
    </v-img>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const NUM_NEXT_IMAGES = 10

export default {
  props: {
    selected: {
      default: null,
      type: String
    }
  },

  data() {
    return {
      aroundImgList: []
    }
  },

  computed: {
    ...mapState(['images']),
    imgIds() {
      return this.images.map(img => img.id)
    },
    filteredImgs() {
      if (this.selected === null) return []

      const centerPos =
        this.images.length !== 0 ? this.imgIds.indexOf(this.selected) : -1

      if (centerPos > -1) {
        const sliceStart =
          centerPos - NUM_NEXT_IMAGES >= 0 ? centerPos - NUM_NEXT_IMAGES : 0
        const sliceEnd = centerPos + NUM_NEXT_IMAGES
        return this.images.slice(sliceStart, sliceEnd)
      } else if (this.aroundImgList.length !== 0) {
        return this.aroundImgList
      }

      return []
    }
  },

  watch: {
    selected: {
      handler(newVal) {
        if (newVal === undefined) return

        const selectPos = this.imgIds.indexOf(newVal)
        // 画像の順番がわかったらその近辺だけを読み込む
        if (this.images.length === 0) {
          this.loadAroundImages(newVal)
        }

        if (this.images.length <= selectPos + 10) {
          this.fetchImgList({ offset: selectPos + 1, limit: 10 })
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.moveToSelectedImg()
  },

  methods: {
    ...mapActions(['fetchImgList']),
    getImagePos(id) {
      const imgRef = this.$refs[id][0].$el
      return imgRef.getBoundingClientRect()
    },
    moveToSelectedImg() {
      if (this.images.length === 0) return
      const selectedPos = this.getImagePos(this.selected)
      if (selectedPos === null) return

      const containerRef = this.$refs.container
      const containerRect = containerRef.getBoundingClientRect()

      // ミニギャラリーの表示部分の真ん中にくるように計算
      const centerPos = selectedPos.left + selectedPos.width / 2
      const scrollLeftPos = centerPos - containerRect.width / 2
      containerRef.scrollLeft = scrollLeftPos
    },
    async loadAroundImages(id) {
      try {
        const selectedRes = await this.$api.getImageDetail(id)
        const selectedImg = selectedRes.data.data

        const listRes = await this.$api.getAroundImageList(id, NUM_NEXT_IMAGES)
        this.aroundImgList = [
          ...listRes.data.prev,
          selectedImg,
          ...listRes.data.next
        ]
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal_container {
  height: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: row nowrap;
}
.mini_img {
  flex-basis: calc(100vh / 12 * 2);
  width: auto;
  height: 100%;
  margin-right: 8px;
  cursor: pointer;
}
.mini_img .selected {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
