import SpriteRenderer from 'engine/renderers/sprite_renderer'


export default class MushroomRenderer extends SpriteRenderer {
    constructor (node) {
        super(node)

        this.onDisplay('click', () => {
            console.log('click')
        })
    }
}