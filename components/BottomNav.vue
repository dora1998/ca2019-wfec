<template>
  <v-bottom-nav
    :active.sync="selected"
    :value="true"
    color="white"
    fixed
  >
    <v-btn
      v-for="item in menu"
      :key="item.value"
      :value="item.value"
      color="teal"
      flat
    >
      <span v-text="item.name" />
      <v-icon v-text="item.icon" />
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
      selected: '/',
      menu: [
        {
          name: 'ライブラリ',
          icon: 'image',
          value: '/'
        },
        {
          name: 'アルバム',
          icon: 'book',
          value: '/albums'
        }
      ]
    }
  },

  watch: {
    currentPath: {
      handler(newVal) {
        if (!newVal) return
        this.selected = newVal
      },
      immediate: true
    },
    selected: {
      handler(newVal) {
        // currentPath の watch による変更だった場合は無視
        if (newVal === this.currentPath) return
        this.$router.push({ path: newVal })
      }
    }
  }
}
</script>
