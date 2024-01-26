import Renderer from '../renderer'
import NotifierProxy from '../notifier_proxy'


export default class DisplayRenderer extends Renderer {

    constructor (node) {
        super(node)

        this.initDisplay()

        this.onNode('changed:position', position => this.syncPosition(position))

        this.onNode('changed:rotation', rotation => this.syncRotation(rotation))

        this.onNode('changed:scale', scale => this.syncScale(scale))

        this.onNode('changed:pivot', pivot => this.syncPivot(pivot))
    }


    initDisplay () {

    }


    syncPosition ({x, y}) {
        this.display.x = x
        this.display.y = y
    }


    syncRotation (rotation) {
        this.display.rotation = rotation
    }


    syncScale ({x, y}) {
        this.display.scale.x = x
        this.display.scale.y = y
    }


    syncPivot ({x, y}) {
        this.display.pivot.x = x
        this.display.pivot.y = y
    }


    onDisplay (eventName, listener) {
        return this.displayNotifier.on(eventName, listener)
    }


    offDisplay (eventName, listener) {
        return this.displayNotifier.off(eventName, listener)
    }


    enableDisplayEvents (type = 'dynamic') {
        this.display.eventMode = type

        if (!this.displayNotifier) {
            this.displayNotifier = new NotifierProxy({target: this.display})
        }
    }


    disasbleDisplayEvents () {
        this.display.eventMode = 'auto'
    }

}
