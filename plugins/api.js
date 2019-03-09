const apiFactory = axios => ({
  getImageList(limit, offset) {
    return axios.get('/images', {
      params: { limit: limit, offset: offset }
    })
  },

  getImageDetail(id) {
    return axios.get(`/image/${id}`)
  }
})

export default ({ $axios }, inject) => {
  const api = apiFactory($axios)
  inject('api', api)
}
