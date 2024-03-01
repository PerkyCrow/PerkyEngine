import Renderer from '../renderer'
import NotifierProxy from '../notifier_proxy'


export default class DisplayRenderer extends Renderer {

    constructor (node) {
        super(node)

        this.initDisplay()
        this.syncAttributes()

        this.onNode('changed:position', position => this.syncPosition(position))

        this.onNode('changed:rotation', rotation => this.syncRotation(rotation))

        this.onNode('changed:scale', scale => this.syncScale(scale))

        this.onNode('changed:pivot', pivot => this.syncPivot(pivot))

        this.onNode('changed:opacity', opacity => this.syncOpacity(opacity))
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

}


// const eventNames = [
//     'pointercancel',
//     'pointerdown',
//     'pointerenter',
//     'pointerleave',
//     'pointermove',
//     'globalpointermove',
//     'pointerout',
//     'pointerover',
//     'pointertap',
//     'pointerup',
//     'pointerupoutside',
//     'mousedown',
//     'mouseenter',
//     'mouseleave',
//     'mousemove',
//     'globalmousemove',
//     'mouseout',
//     'mouseover',
//     'mouseup',
//     'mouseupoutside',
//     'click',
//     'touchcancel',
//     'touchend',
//     'touchendoutside',
//     'touchmove',
//     'globaltouchmove',
//     'touchstart',
//     'tap',
//     'wheel',
//     'rightclick',
//     'rightdown',
//     'rightup',
//     'rightupoutside'
// ]

// function forwardDisplayEvents (renderer) {
//     const {display, node} = renderer

//     if (display && node) {
//         eventNames.forEach(eventName => {
//             display.on(eventName, (event) => {
//                 node.emit(eventName, event)
//             })
//         })
//     }

// }
