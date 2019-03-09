<template>
  <div class="horizontal_container">
    <v-img
      v-for="img in images"
      :key="img.id"
      :src="img.url"
      @click="$emit('click_img', img.id)"
      class="mini_img"
    >
      <div
        v-if="img.id !== selected"
        class="fill-height not-selected"
      />
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      default: () => [],
      type: Array
    },
    selected: {
      default: null,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal_container {
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
.mini_img .not-selected {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
