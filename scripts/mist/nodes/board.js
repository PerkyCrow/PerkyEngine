import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Board extends Node2D {

    constructor (params = {}) {
        super(params)

        this.setAttribute('width', {
            serializable: true,
            watch: true,
            defaultValue: 6,
            value: params.width
        })

        this.setAttribute('height', {
            serializable: true,
            watch: true,
            defaultValue: 9,
            value: params.height
        })

        this.margin = {
            x: 1,
            y: 2
        }

        this.position = this.getCenter()
    }

    get spriteWidth () {
        return this.width + this.margin.x
    }

    get spriteHeight () {
        return this.height + this.margin.y
    }

    getCenter () {
        return {
            x: -(this.spriteWidth / 2),
            y: -(this.spriteHeight / 2)
        }
    }

    onReady () {

        this.sprite = this.create('Sprite', {
            texture: assets.get('board_frame'),
            width: this.spriteWidth,
            height: this.spriteHeight
        })

    }

}
