import canvasImageLoader from './canvas_image_loader'
import Texture from '../texture'


export default {
    type: 'texture',
    extensions: [],
    load (path, options = {}) {
        return canvasImageLoader.load(path, options).then(image => {
            return Texture.from(image)
        })
    }
}
