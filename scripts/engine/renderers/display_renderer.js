import Renderer from '../renderer'
import NotifierProxy from '../notifier_proxy'

export default class DisplayRenderer extends Renderer {

    constructor (node) {
        super(node)

        this.onNode('changed:position', ({x, y}) => {
            this.display.x = x
            this.display.y = y
        })

        this.onNode('changed:rotation', rotation => {
            this.display.rotation = rotation
        })

        this.onNode('changed:scale', ({x, y}) => {
            this.display.scale.x = x
            this.display.scale.y = y
        })

        this.onNode('changed:pivot', ({x, y}) => {
            this.display.pivot.x = x
            this.display.pivot.y = y
        })
    }


    onDisplay (eventName, listener) {
        return this.displayNotifier.on(eventName, listener)
    }


    offDisplay (eventName, listener) {
        return this.displayNotifier.off(eventName, listener)
    }


    enableDisplayEvents (type = 'dynamic') {
        this.display.interactive = true
        this.display.eventMode = type

        if (!this.displayNotifier) {
            this.displayNotifier = new NotifierProxy({target: this.display})
        }
    }


    disasbleDisplayEvents () {
        this.display.interactive = false
        this.display.eventMode = 'auto'
    }

}
