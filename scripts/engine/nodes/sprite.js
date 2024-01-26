import Rectangle from './rectangle'


export default class Sprite extends Rectangle {

    constructor () {
        super()

        this.isSprite = true
        this.rendererName = 'Sprite'

        this.setAttribute('texture', {
            accessor: true,
            serializable: true,
            exposable: true,
            watch: true,
            type: 'Texture'
        })

    }

}
