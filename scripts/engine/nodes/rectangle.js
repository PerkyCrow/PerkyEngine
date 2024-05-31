import Node2D from './node_2d'


export default class Rectangle extends Node2D {

    static renderable = true

    static rendererName = 'Rectangle'


    constructor (params = {}) {
        super(params)

        this.isRectangle = true

        this.setAttribute('width', {
            serializable: true,
            watch: true,
            defaultValue: 1,
            value: params.width
        })

        this.setAttribute('height', {
            serializable: true,
            watch: true,
            defaultValue: 1,
            value: params.height
        })

    }


    get aspectRatio () {
        return this.width / this.height
    }

}
