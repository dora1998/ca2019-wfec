<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
    >
      <name-input-dialog :showProp.sync="show" />
      <h1 class="mb-2">
        アルバム
      </h1>
      <album-list />
      <v-btn
        @click="openAddDialog"
        fab
        dark
        color="secondary"
        class="fab"
      >
        <v-icon dark>
          add
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import AlbumList from '~/components/AlbumList'
import NameInputDialog from '~/components/NameInputDialog'

export default {
  layout: 'with_bottomnav',

  components: {
    AlbumList,
    NameInputDialog
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    openAddDialog() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.fab {
  position: absolute;
  right: 16px;
  bottom: 72px;
}
</style>
