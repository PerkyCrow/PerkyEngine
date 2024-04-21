import InputMap from './input_map'
import InputObserver from './input_observer'
import Notifier from './notifier'


export default class InputManager extends Notifier {

    constructor ({container = window} = {}) {
        super()
        this.inputObserver = new InputObserver({container})
        this.inputMaps     = {}
        this.activeMap     = new Set()
        this.mainInputMap  = this.create('main', {active: true})

        this.init()
    }


    init () {

        this.inputObserver.on('pressed', input => {
            this.activeMap.forEach(inputMap => inputMap.press(input))
            this.emit(`input:pressed:${input}`)
            this.emit('input:pressed', input)
        })

        this.inputObserver.on('released', input => {
            this.activeMap.forEach(inputMap => inputMap.release(input))
            this.emit(`input:released:${input}`)
            this.emit('input:released', input)
        })
    }


    create (name, {map = {}, active} = {}) {
        const inputMap = new InputMap(map)
        this.inputMaps[name] = inputMap

        inputMap.on('pressed', action => {
            if (this.activeMap.has(inputMap)) {
                this.emit(`action:pressed:${action}`, name)
                this.emit('action:pressed', action, name)
            }
        })

        inputMap.on('released', action => {
            if (this.activeMap.has(inputMap)) {
                this.emit(`action:released:${action}`, name)
                this.emit('action:released', action, name)
            }
        })

        this.emit('created', inputMap)

        if (active) {
            this.activate(name)
        }

        return inputMap
    }


    get (name) {
        if (name instanceof InputMap && this.toArray().includes(name)) {
            return name
        }

        return this.inputMaps[name]
    }


    getNameFor (inputMap) {
        return Object.keys(this.inputMaps).find(name => this.inputMaps[name] === inputMap)
    }


    list () {
        return Object.keys(this.inputMaps)
    }


    activate (name) {
        const inputMap = this.get(name)

        if (inputMap && !this.activeMap.has(inputMap)) {
            this.activeMap.add(inputMap)
            this.emit('activated', inputMap)
        }
    }


    isActive (name) {
        const inputMap = this.get(name)
        return this.activeMap.has(inputMap)
    }


    mute (name) {
        const inputMap = this.get(name)

        if (inputMap && this.activeMap.has(inputMap)) {
            this.activeMap.delete(inputMap)
            this.emit('muted', inputMap)
        }
    }


    remove (name) {
        const inputMap = this.inputMaps[name]

        if (inputMap) {
            this.mute(name)
            delete this.inputMaps[name]

            this.emit('removed', inputMap)
        }
    }


    pressAction (action) {
        this.activeMap.forEach(inputMap => inputMap.press(action))
    }


    releaseAction (action) {
        this.activeMap.forEach(inputMap => inputMap.release(action))
    }


    isActionPressed (action) {
        return Array.from(this.activeMap).some(inputMap => inputMap.isPressed(action))
    }


    pressInput (input) {
        this.inputObserver.press(input)
    }


    releaseInput (input) {
        this.inputObserver.release(input)
    }


    isInputPressed (input) {
        return this.inputObserver.isPressed(input)
    }


    toArray () {
        return Object.values(this.inputMaps)
    }

}
