
export const type = 'image'

export const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg']


export function load (path) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.addEventListener('load',     () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.src = path
    })
}
