const IMG_LIMIT = 24

export const state = () => ({
  images: [],
  isLoadComplete: false
})

export const mutations = {
  setImages(state, newImgs) {
    state.images = newImgs
  },
  addImages(state, newImgs) {
    if (newImgs.length === 0) {
      state.isLoadComplete = true
      return
    }
    state.images.push(...newImgs)
  }
}

export const actions = {
  async fetchImgList({ commit, state }, offset = 0) {
    if (state.isLoadComplete) return
    const res = await this.$api.getImageList(IMG_LIMIT, offset)
    const result = res.data
    commit('addImages', result.data.images)
  }
}
