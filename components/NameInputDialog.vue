<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">アルバムを作成</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="inputName"
          label="アルバム名" 
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="show = false" color="blue darken-1" flat>
          キャンセル
        </v-btn>
        <v-btn @click="createAlbum" color="blue darken-1" flat>
          作成
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NameInputDialog',

  props: {
    showProp: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      show: false,
      inputName: ''
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

  methods: {
    ...mapActions('albums', ['addEmptyAlbum']),
    createAlbum() {
      this.addEmptyAlbum(this.inputName)
      this.show = false
    }
  }
}
</script>
