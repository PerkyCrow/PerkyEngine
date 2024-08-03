import Node2D from 'engine/nodes/node_2d'
import ObservableVector2 from 'engine/observable_vector_2'
import assets from 'engine/assets'


export default class Reagent extends Node2D {

    constructor (params = {}) {
        super(params)

        this.isReagent = true

        this.setAttribute('assetName', {
            serializable: true,
            watch: true,
            defaultValue: 'flower_01',
            value: params.assetName
        })

        this.setAttribute('gridPosition', {
            serializable: true,
            watch: true,
            defaultValue: new ObservableVector2(this.position),
            options: {
                onChange: this.emitter('changed:gridPosition')
            }
        })


        this.spritesheet = assets.get('reagents')

        if (this.spritesheet) {
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

}
