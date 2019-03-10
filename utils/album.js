import uuidv1 from 'uuid/v1'

export default {
  async loadAlbum(vm, album, images) {
    const imgs = []
    for (const img of album.imgs) {
      if (images[img] !== undefined) {
        imgs.push(this.images[img])
      } else {
        const res = await vm.$api.getImageDetail(img)
        const imgData = res.data.data
        imgs.push(imgData)
      }
    }
    return { name: album.name, imgs: imgs }
  },

  generateUUID() {
    return uuidv1()
  }
}
