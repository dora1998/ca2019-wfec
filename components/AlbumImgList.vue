<template>
  <div class="imglist_container">
    <v-img
      v-for="img in images"
      :key="img.id"
      :src="img.url"
      aspect-ratio="1"
      class="grey lighten-2 img"
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
  </div>
</template>

<script>
export default {
  props: {
    images: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.imglist_container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .img {
    flex-basis: 10%;
    flex-grow: 0;
  }
}
</style>
