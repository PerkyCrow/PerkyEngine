import Node from '../node'
import ObservableVector2 from '../observable_vector_2'


export default class Node2D extends Node {

    constructor () {
        super()

        this.setAttribute('position', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: new ObservableVector2(0, 0),
            options: {
                onChange: this.emitter('changed:position')
            }
        })

        this.setAttribute('rotation', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: 0
        })

        this.setAttribute('scale', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: new ObservableVector2(1, 1, this.emitter('changed:scale'))
        })

        this.setAttribute('pivot', {
            accessor: true,
            serializable: true,
            exposable: true,
            defaultValue: new ObservableVector2(0, 0, this.emitter('changed:pivot'))
        })

        this.parent2D = null
        this.root2D   = this

        registerEvents(this)
    }


    get is2D () {
        return true
    }


    get isRoot2D () {
        return this.root2D === this
    }


    translate (offset) {
        this.position = this.position.add(offset)
    }


    rotate (angle) {
        this.rotation += angle
    }


    applyScale (ratio) {
        ratio = Vector2.toVector2(ratio)
        this.scale = this.scale.multiply(ratio)
    }


    getAngleTo (target) {
        target = Vector2.toVector2(target)
        return Math.atan2(target.y - this.position.y, target.x - this.position.x)
    }


    getDistanceTo (target) {
        target = Vector2.toVector2(target)
        return target.subtract(this.position).magnitude
    }


    getDirectionTo (target) {
        target = Vector2.toVector2(target)
        return target.subtract(this.position).normalize()
    }


    lookAt (target) {
        target = Vector2.toVector2(target)
        this.rotation = this.getAngleTo(target)
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