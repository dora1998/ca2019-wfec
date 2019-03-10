<template>
  <v-bottom-sheet v-model="show">
    <v-list>
      <v-subheader>アルバムに追加...</v-subheader>
      <v-list-tile
        v-for="(album, id) in savedList"
        :key="id"
        @click="choose(id)"
      >
        <v-list-tile-avatar>
          <v-icon size="32px">
            book
          </v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>{{ album.name }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AlbumSelectSheet',

  props: {
    showProp: {
      default: false,
      type: Boolean
    },
    selected: {
      default: null,
      type: String
    }
  },

  data() {
    return {
      show: false
    }
  },

  watch: {
    showProp: {
      handler(newVal) {
        this.show = newVal
      },
      immediate: true
    },
    show: {
      handler(newVal) {
        this.$emit('update:showProp', newVal)
      }
    }
  },

  computed: {
    ...mapState('albums', ['savedList'])
  },

  methods: {
    choose(id) {
      this.$emit('update:selected', id)
      this.show = false
    }
  }
}
</script>
