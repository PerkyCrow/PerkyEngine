import RectangleRenderer from './rectangle_renderer'
import {Container} from 'pixi.js'


export default class LayerRenderer extends RectangleRenderer {

    initDisplay () {
        this.display = new Container({
            isRenderGroup: true
        })
    }


    syncWidth () {
        this.syncPosition(this.node.position)
    }


    syncHeight () {
        this.syncPosition(this.node.position)
    }

}
