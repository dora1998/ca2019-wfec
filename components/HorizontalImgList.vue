<template>
  <div class="horizontal_container">
    <v-img
      v-for="img in images"
      :key="img.id"
      :src="img.url"
      @click="$emit('click_img', img.id)"
      class="mini_img"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      default: () => [],
      type: Array
    },
    pos: {
      default: 0,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal_container {
  width: auto;
  height: 100%;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: row nowrap;
}
.mini_img {
  flex: 0 0 20%;
  margin-right: 8px;
}
</style>
