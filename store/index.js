const IMG_LIMIT = 20

export const state = () => ({
  images: []
})

export const mutations = {
  setImages(state, newImgs) {
    state.images = newImgs
  },
  addImages(state, newImgs) {
    state.images.push(...newImgs)
  }
}

export const actions = {
  async fetchImgList({ commit }, offset = 0) {
    const res = await this.$api.getImageList(IMG_LIMIT, offset)
    const result = res.data
    commit('addImages', result.data.images)
  }
}
