import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'mygallery',
      paths: ['albums.savedList']
    })(store)
  })
}
