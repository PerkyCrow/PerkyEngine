export default class Notifier {

    constructor () {
        this.listenersFor = {}
    }


    getListenersFor (name) {
        return this.listenersFor[name]
    }


    on (name, listener) {
        const {listenersFor} = this

        if (!listenersFor[name]) {
            listenersFor[name] = []
        }

        listenersFor[name].push(listener)

        return listener
    }


    off (name, listener) {
        const listeners = this.getListenersFor(name)

        if (Array.isArray(listeners)) {
            const index = listeners.indexOf(listener)

            if (index !== -1) {
                listeners.splice(index, 1)
                return true
            }
        }

        return false
    }


    emit (name, ...args) {
        const listeners = this.getListenersFor(name) || []

        for (let listener of listeners) {
            listener.apply(this, args)
        }
    }

    emitter (name) {
        return (...args) => this.emit(name, ...args)
    }


    removeListeners () {
        Object.keys(this.listenersFor).forEach(name => this.removeListenersFor(name))
    }


    removeListenersFor (name) {
        const listeners = this.getListenersFor(name)

        if (listeners) {
            if (Array.isArray(listeners)) {
                listeners.length = 0
            }

            delete this.listenersFor[name]

            return true
        }

        return false
    }

}
