import Node from '../node'
import Vector2 from '../types/vector_2'


export default class Sprite extends Node {

    constructor () {
        super()

        this.setAttribute('texture', {
            accessor: true,
            type: 'Texture'
        })

        this.setAttribute('width', {
            accessor: true,
            defaultValue: 0
        })

        this.setAttribute('height', {
            accessor: true,
            defaultValue: 0
        })

        this.setAttribute('anchor', {
            accessor: true,
            defaultValue: new Vector2(1, 1)
        })

    }


    get isSprite () {
        return true
    }


}

