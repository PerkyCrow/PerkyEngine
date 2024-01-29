import RectangleRenderer from './rectangle_renderer'
import {Container} from 'pixi.js'


export default class CameraRenderer extends RectangleRenderer {

    initDisplay () {
        this.display = new Container()
    }


    syncWidth () {
        this.syncPosition(this.node.position)
    }


    syncHeight () {
        this.syncPosition(this.node.position)
    }

}
