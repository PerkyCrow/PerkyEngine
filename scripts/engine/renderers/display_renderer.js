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

        this.onNode('changed:opacity', opacity => this.syncOpacity(opacity))

        this.syncAttributes()
    }


    initDisplay () {

    }


    syncAttributes () {
        if (this.display) {
            this.syncPosition(this.node.position)
            this.syncRotation(this.node.rotation)
            this.syncScale(this.node.scale)
            this.syncPivot(this.node.pivot)
            this.syncOpacity(this.node.opacity)
        }
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


    syncOpacity (opacity) {
        this.display.alpha = opacity
    }


    onDisplay (eventName, listener) {
        if (this.display.eventMode !== 'dynamic' || this.display.eventMode !== 'static') {
            this.enableDisplayEvents()
        }

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


    getGlobalScale () {
        return this.display.getGlobalScale()
    }

}
