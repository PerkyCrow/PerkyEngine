
export default {
    type: 'image',
    extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
    load (path) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.crossOrigin = 'Anonymous'
            image.addEventListener('load',     () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.src = path
        })
    }
}
