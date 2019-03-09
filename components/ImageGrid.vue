<template>
  <v-container grid-list-sm fluid>
    <v-layout row wrap>
      <v-flex
        v-for="n in 9"
        :key="n"
        xs4
        d-flex
      >
        <v-card flat tile class="d-flex">
          <v-img
            src="https://pixabay.com/get/ed35b20d2cf3003ed1584d05fb1d4797eb75e1d211b90c4090f5c379a3eab3bad0_640.jpg"
            aspect-ratio="1"
            class="grey lighten-2"
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ImageGrid'
}
</script>
