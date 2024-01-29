import Rectangle from './rectangle'
import ObservableVector2 from '../types/observable_vector_2'


export default class Sprite extends Rectangle {

    constructor (params) {
        super(params)

        this.isSprite = true
        this.rendererName = 'Sprite'

        this.setAttribute('texture', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            value: params.texture,
            type: 'Texture'
        })

        this.setAttribute('anchor', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: new ObservableVector2(0, 0),
            value: params.anchor,
            watch: true,
            options: {
                onChange: this.emitter('changed:anchor')
            }
        })

    }

}
