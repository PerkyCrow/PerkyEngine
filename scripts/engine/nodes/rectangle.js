import Node2D from './node_2d'


export default class Rectangle extends Node2D {

    constructor () {
        super()

        this.isRectangle = true
        this.rendererName = 'Rectangle'

        this.setAttribute('width', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            defaultValue: 1
        })

        this.setAttribute('height', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            defaultValue: 1
        })

    }

}
