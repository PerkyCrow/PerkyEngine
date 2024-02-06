import Node from '../node'


export default class Animation extends Node {

    constructor (params = {}) {
        super(params)
        this.isAnimation     = true
        this.parentAnimation = null
        this.rootAnimation   = this
        this.playing         = false
        this.actor           = params.actor

        this.setAttribute('duration', {
            accessor: true,
            defaultValue: 1,
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
        if (this.playing) {
            this.elapsedTime += deltaTime

            if (this.overflow >= 0) {
                this.stop()
            }
        }
    }


    update (...args) {
        super.update(...args)
        this.tick(...args)
    }


    play (params) {
        if (!this.playing) {
            this.playing = true
            setParams(this, params)
            this.emit('play', params)

            return new Promise(resolve => {
                this.notifyStop = resolve
            })
        }

        return false
    }


    stop () {
        if (this.playing) {
            this.playing = false
            this.emit('stop')

            if (this.notifyStop) {
                this.notifyStop()
                delete this.notifyStop
            }
        }
    }

}



function setParams (animation, {duration, elapsedTime} = {}) {
    if (typeof duration === 'number') {
        animation.duration = duration
    }

    if (typeof elapsedTime === 'number') {
        animation.elapsedTimeCache = elapsedTime
    }
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
