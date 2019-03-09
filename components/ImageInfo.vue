<template>
  <div class="info_container">
    <h2 v-text="img.title" />
    <p v-text="img.description" />
    <p>
      <v-icon small dark>
        calendar_today
      </v-icon> {{ formatted_date }}
    </p>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ImageInfo',

  props: {
    img: {
      default: null,
      type: Object
    }
  },

  computed: {
    formatted_date() {
      if (this.img === null || !this.img.postDatetime) return null
      return moment(this.img.postDatetime).format('YYYY/MM/DD hh:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.info_container {
  position: absolute;
  bottom: 8px;
  width: 100%;
  padding: 32px 8px 8px;

  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.6) calc(100% - 32px),
    transparent 100%
  );
  color: #fff;

  p {
    margin-bottom: 8px;
  }
}
</style>
