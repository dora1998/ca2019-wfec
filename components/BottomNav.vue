<template>
  <v-bottom-nav
    :active.sync="selecteed"
    :value="true"
    color="white"
    fixed
  >
    <v-btn
      color="teal"
      flat
      value="recent"
    >
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="favorites"
    >
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="nearby"
    >
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav',

  props: {
    currentPath: {
      default: null,
      type: String
    }
  },

  data() {
    return {
      selecteed: '/',
      menu: [
        {
          name: 'ライブラリ',
          icon: 'image',
          value: '/'
        }
      ]
    }
  },

  watch: {
    currentPath: {
      handler(newVal) {
        if (!newVal) return
        this.selecteed = newVal
      },
      immediate: true
    }
  }
}
</script>
