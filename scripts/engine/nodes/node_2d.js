import Node from '../node'
import ObservableVector2 from '../observable_vector_2'


export default class Node2D extends Node {

    static renderable = true

    static rendererName = 'Container'


    constructor (params = {}) {
        super(params)

        this.is2D = true

        this.setAttribute('position', {
            serializable: true,
            watch: true,
            type: 'ObservableVector2',
            defaultValue: new ObservableVector2(0, 0),
            value: params.position,
            options: {
                onChange: this.emitter('changed:position')
            }
        })

        this.setAttribute('rotation', {
            serializable: true,
            watch: true,
            defaultValue: 0,
            value: params.rotation
        })

        this.setAttribute('scale', {
            serializable: true,
            watch: true,
            type: 'ObservableVector2',
            defaultValue: new ObservableVector2(1, 1),
            value: params.scale,
            options: {
                onChange: this.emitter('changed:scale')
            }
        })

        this.setAttribute('pivot', {
            serializable: true,
            watch: true,
            type: 'ObservableVector2',
            defaultValue: new ObservableVector2(0, 0),
            value: params.pivot,
            options: {
                onChange: this.emitter('changed:pivot')
            }
        })

        this.setAttribute('opacity', {
            serializable: true,
            defaultValue: 1,
            value: params.opacity,
            watch: true
        })

        this.parent2D = null
        this.root2D   = this

        registerEvents(this)
    }


    get isRoot2D () {
        return this.root2D === this
    }


    get display () {
        return this.renderer && this.renderer.display
    }


    get parentDisplay () {
        return this.parent2D && this.parent2D.display
    }


    onDisplay (eventName, listener) {
        return this.renderer && this.renderer.onDisplay(eventName, listener)
    }


    offDisplay (eventName, listener) {
        return this.renderer && this.renderer.offDisplay(eventName, listener)
    }


    translate (offset) {
        this.position = this.position.add(offset)
    }


    rotate (angle) {
        this.rotation += angle
    }


    applyScale (ratio) {
        this.scale = this.scale.multiply(ratio)
    }


    getAngleTo (target) {
        return Math.atan2(target.y - this.position.y, target.x - this.position.x)
    }


    getDistanceTo (target) {
        return target.subtract(this.position).magnitude
    }


    getDirectionTo (target) {
        return target.subtract(this.position).normalize()
    }


    lookAt (target) {
        this.rotation = this.getAngleTo(target)
    }


    localPositionFromEvent (event) {
        const {parentDisplay, display} = this
        return (parentDisplay || display).toLocal(event.data.global)
    }

}


function registerEvents (node) {

    node.on('attached', () => {
        const parent2D = getParent2D(node)

        if (parent2D) {
            node.parent2D = parent2D
            node.root2D   = getRoot2D(parent2D)
        } else {
            node.parent2D = null
            node.root2D   = node
        }
    })

    node.on('detached', () => {
        node.parent2D = null
        node.root2D   = node
    })

}


function getParent2D (node) {
    if (node.parent) {
        return node.parent.is2D ? node.parent : getParent2D(node.parent)
    }

    return null
}



function getRoot2D (node) {
    return node.parent2D ? getRoot2D(node.parent2D) : node
}