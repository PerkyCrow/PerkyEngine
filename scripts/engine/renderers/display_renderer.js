import Renderer from '../renderer'
import NotifierProxy from '../notifier_proxy'

export default class DisplayRenderer extends Renderer {

    constructor (node) {
        super(node)

        let display

        Object.defineProperty(this, 'display', {
            enumerable: true,
            get: () => display,
            set: value => {
                if (value !== display) {
                    if (this.displayNotifier) {
                        this.displayNotifier.removeListeners()
                    }

                    this.displayNotifier = new NotifierProxy({target: value})

                    display = value
                }
            }
        })

        this.onNode('changed:position', ({x, y}) => {
            display.x = x
            display.y = y
        })

        this.onNode('changed:rotation', rotation => {
            display.rotation = rotation
        })

        this.onNode('changed:scale', ({x, y}) => {
            display.scale.x = x
            display.scale.y = y
        })

        this.onNode('changed:pivot', ({x, y}) => {
            display.pivot.x = x
            display.pivot.y = y
        })
    }


    onDisplay (eventName, listener) {
        return this.displayNotifier.on(eventName, listener)
    }


    offDisplay (eventName, listener) {
        return this.displayNotifier.off(eventName, listener)
    }

}
