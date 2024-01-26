import Node2D from './node_2d'
import ObservableVector2 from '../types/observable_vector_2'


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

        this.setAttribute('anchor', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: new ObservableVector2(0, 0),
            watch: true,
            options: {
                onChange: this.emitter('changed:anchor')
            }
        })

    }

}

