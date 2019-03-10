import Vue from 'vue'
import album from '~/utils/album'

export const state = () => ({
  savedList: {
    '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e': {
      name: 'テスト',
      imgs: ['4043963', '4042521', '4044004']
    }
  },
  cachedList: {}
})

export const mutations = {
  setCachedList(state, params) {
    Vue.set(state.cachedList, params.id, params.data)
  },
  addAlbum(state, params) {
    Vue.set(state.savedList, params.id, params.data)
  }
}

export const actions = {
  addEmptyAlbum({ commit }, name) {
    const data = {
      name: 'アルバム',
      imgs: []
    }
    commit('addAlbum', { id: album.generateUUID(), data: data })
  },

  addImgToAlbum({ state, commit }, params) {
    const savedAlbum = Object.assign({}, state.savedList[params.albumId])
    savedAlbum.imgs = savedAlbum.imgs.concat()
    savedAlbum.imgs.push(params.image.id)
    commit('addAlbum', { id: params.albumId, data: savedAlbum })

    if (state.cachedList[params.albumId] !== undefined) {
      const cachedAlbum = Object.assign({}, state.cachedList[params.albumId])
      cachedAlbum.imgs = cachedAlbum.imgs.concat()
      cachedAlbum.imgs.push(params.image)
      commit('setCachedList', { id: params.albumId, data: cachedAlbum })
    }
  }
}
