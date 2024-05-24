import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'

export default class Reagent extends Node2D {

    constructor (params = {}) {
        super(params)

        this.setAttribute('assetName', {
            accessor: true,
            serializable: true,
            watch: true,
            defaultValue: 'flower_01',
            value: params.texture
        })

        this.spritesheet = assets.get('reagents')

        this.sprite = this.create('Sprite', {
            texture: this.spritesheet.get(this.assetName),
            width:  1,
            height: 1
        })

        this.on('changed:assetName', () => {
            this.sprite.texture = this.spritesheet.get(this.assetName)
        })
    }

}
