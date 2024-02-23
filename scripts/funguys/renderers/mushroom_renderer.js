import SpriteRenderer from 'engine/renderers/sprite_renderer'


export default class MushroomRenderer extends SpriteRenderer {
    constructor (node) {
        super(node)

        this.onDisplay('click', async () => {
            // await node.parent.spawnSpores()
            await node.parent.squish.play()

            // node.parent.squish2.play()
            // await node.parent.squish1.play()

            node.parent.scale.y = 1
            node.parent.scale.x = 1

        })
    }
}