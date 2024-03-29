import imageLoader from './image_loader'


export default {
    type: 'canvas_image',
    load (path) {
        return imageLoader.load(path).then(image => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
        
            canvas.width  = image.width
            canvas.height = image.height

            context.drawImage(image, 0, 0)
        
            return canvas
        })
    }
}


