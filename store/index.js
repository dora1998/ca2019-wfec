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
    if (newImgs.length === 0 || newImgs.length < IMG_LIMIT) {
      state.isLoadComplete = true
      return
    }

    if (state.images.length === 0) {
      state.images.push(...newImgs)
    } else {
      // 被りがある場合は除く
      const lastImgId = state.images[state.images.length - 1].id
      const newImgIds = newImgs.map(img => img.id)

      const startIndex = newImgIds.indexOf(lastImgId)
      if (startIndex === -1) {
        state.images.push(...newImgs)
      } else {
        state.images.push(...newImgs.slice(startIndex + 1, newImgs.length - 1))
      }
    }
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
