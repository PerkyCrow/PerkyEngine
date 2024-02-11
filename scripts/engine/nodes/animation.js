import Node from '../node'


export default class Animation extends Node {

    constructor (params = {}) {
        super(params)
        this.isAnimation     = true
        this.parentAnimation = null
        this.rootAnimation   = this
        this.playing         = false
        this.ended           = false

        this.setAttribute('duration', {
            accessor: true,
            defaultValue: 1,
            watch: true,
            value: params.duration
        })

        this.setAttribute('elapsedTime', {
            accessor: true,
            defaultValue: 0,
            value: params.elapsedTime
        })

        registerEvents(this)
    }


    get isRootAnimation () {
        return this.rootAnimation === this
    }


    get progress () {
        return this.elapsedTime / this.duration
    }


    set progress (progress) {
        this.elapsedTime = this.duration * Math.max(0, Math.min(1, progress))
    }


    get overflow () {
        return this.elapsedTime - this.duration
    }


    tick (deltaTime) {
        if (this.playing && !this.ended) {
            this.elapsedTime += deltaTime

            if (this.overflow >= 0) {
                this.ended = true
                this.emit('end')
                this.stop()
            }
        }
    }


    update (...args) {
        if (super.update(...args)) {
            this.tick(...args)

            return true
        }

        return false
    }


    play (params) {
        if (this.playing) {
            this.stop()
        }

        this.ended = false
        this.playing = true
        setParams(this, params)
        this.emit('play', params)

        return new Promise(resolve => {
            this.notifyStop = resolve
        })
    }


    stop () {
        if (this.playing) {

            for (let child of this.children) {
                if (child.isAnimation) {
                    child.stop()
                }
            }

            this.playing = false
            this.emit('stop')

            if (this.notifyStop) {
                this.notifyStop()
                delete this.notifyStop
            }

            return true
        }

        return false
    }

}



function setParams (animation, {duration, elapsedTime = 0} = {}) {
    if (typeof duration === 'number') {
        animation.duration = duration
    }

    animation.elapsedTime = elapsedTime
}


function getParentAnimation (node) {
    if (node.parent) {
        return node.parent.isAnimation ? node.parent : getParentAnimation(node.parent)
    }

    return null
}


function getRootAnimation (node) {
    return node.parentAnimation ? getRootAnimation(node.parentAnimation) : node
}


function registerEvents (node) {

    node.on('attached', () => {
        const parentAnimation = getParentAnimation(node)

        if (parentAnimation) {
            node.parentAnimation = parentAnimation
            node.rootAnimation   = getRootAnimation(parentAnimation)
        } else {
            node.parentAnimation = null
            node.rootAnimation   = node
        }
    })

    node.on('detached', () => {
        node.parentAnimation = null
        node.rootAnimation   = node
    })

}
