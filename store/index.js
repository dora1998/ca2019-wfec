export const state = () => ({
  images: [],
  isLoadComplete: false
})

export const mutations = {
  setImages(state, newImgs) {
    state.images = newImgs
  },
  addImages(state, newImgs) {
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
  },
  setLoadComplete(state, newState) {
    state.isLoadComplete = newState
  }
}

export const actions = {
  async fetchImgList({ commit, state }, options) {
    if (state.isLoadComplete) return
    const res = await this.$api.getImageList(options.limit, options.offset)
    const result = res.data
    const images = result.data.images

    if (images.length === 0 || images.length < options.limit) {
      commit('setLoadComplete', true)
    }

    commit('addImages', result.data.images)
  }
}
