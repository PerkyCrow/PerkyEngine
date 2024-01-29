import Node2D from './node_2d'


export default class Rectangle extends Node2D {

    constructor (params = {}) {
        super(params)

        this.isRectangle = true
        this.rendererName = 'Rectangle'

        this.setAttribute('width', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            defaultValue: 1,
            value: params.width
        })

        this.setAttribute('height', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            defaultValue: 1,
            value: params.height
        })

    }


    get aspectRatio () {
        return this.width / this.height
    }

}
