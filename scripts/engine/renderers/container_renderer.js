import DisplayRenderer from './display_renderer'
import {Container} from 'pixi.js'


export default class ContainerRenderer extends DisplayRenderer {

    initDisplay () {
        this.display = new Container()
    }

}
