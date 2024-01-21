import Notifier from './notifier'


export default class NotifierProxy extends Notifier {

    constructor ({
        target,
        on  = target.on.bind(target),
        off = target.off.bind(target),
        emit = target.emit.bind(target)
    }) {
        super()
        this.target = target

        this.proxyMethods = {
            on,
            off,
            emit
        }
    }


    on (name, listener) {
        super.on(name, listener)
        this.proxyMethods.on(name, listener)

        return listener
    }


    off (name, listener) {
        const success = super.off(name, listener)
        this.proxyMethods.off(name, listener)

        return success
    }


    emit (name, ...args) {
        this.proxyMethods.emit(name, ...args)
    }


    removeListenersFor (name) {
        const listeners = Array.from(this.getListenersFor(name) || [])

        for (let listener of listeners) {
            this.proxyMethods.off(name, listener)
        }

        return super.removeListenersFor(name)
    }

}
