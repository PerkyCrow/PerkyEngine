import imageLoader from './image_loader'
import {Texture} from '@pixi/core'


export const type = 'texture'

export function load (path, options = {}) {
    return imageLoader.load(path, options).then(image => {
        return Texture.from(image)
    })
}
