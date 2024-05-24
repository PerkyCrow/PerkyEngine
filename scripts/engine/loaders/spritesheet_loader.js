import jsonLoader from './json_loader'
import textureLoader from './texture_loader'
import Spritesheet from '../spritesheet'

export default {
    type: 'spritesheet',
    extensions: [],
    load (path, options = {}) {
        return jsonLoader.load(path, options).then(data => {
            const frames = Array.isArray(data.frames) ? formatFrames(data.frames) : data.frames
            data.frames = frames

            const extension = data.meta.image.split('.').pop()
            const relativePath = path.split('/').slice(0, -1).join('/')
            return textureLoader.load(`${relativePath}/${data.meta.image}`, options).then(async texture => {
                const spritesheet = new Spritesheet(texture, data)
                await spritesheet.parse()
                spritesheet.extension = extension
                return spritesheet
            })
        })
    }
}


function formatFrames (frames) {

    const formattedFrames = {}

    frames.forEach(frame => {
        formattedFrames[frame.filename] = frame
    })

    return formattedFrames

}
