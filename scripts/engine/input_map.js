import Notifier from './notifier'


export default class InputMap extends Notifier {

    constructor (map = {}) {
        super()
        this.map = new Map()
        this.pressed = {}

        this.restore(map)
    }


    setInputFor (action, input, slot = 0)  {
        if (!this.map.has(action)) {
            this.map.set(action, [])
        }

        const inputs = this.map.get(action)

        if (inputs.length <= slot) {
            inputs.length = slot + 1
        }

        inputs[slot] = input

        this.emit('set:input', input, slot, action)
    }


    removeInputFor (action, slot = 0) {
        if (!this.map.has(action)) {
            return
        }

        const inputs = this.map.get(action)

        if (inputs.length <= slot) {
            return
        }

        inputs[slot] = null

        this.emit('removed:input', action, slot)
    }


    getInputFor (action, slot = 0) {
        if (!this.map.has(action)) {
            return null
        }

        const inputs = this.map.get(action)

        if (inputs.length <= slot) {
            return null
        }

        return inputs[slot]
    }


    getActionsFor (input) {
        const actions = []

        for (const [action, inputs] of this.map) {
            if (inputs.includes(input)) {
                actions.push(action)
            }
        }

        return actions
    }


    getActionFor (input) {
        for (const [action, inputs] of this.map) {
            if (inputs.includes(input)) {
                return action
            }
        }

        return null
    }


    isMapped (input) {
        return Boolean(this.getActionFor(input))
    }


    press (input) {
        const action = this.getActionFor(input)

        if (action) {
            this.pressed[action] = 1
            this.emit(`pressed:${action}`)
            this.emit('pressed', action)
        }
    }


    release (input) {
        const action = this.getActionFor(input)

        if (action) {
            delete this.pressed[action]
            this.emit(`released:${action}`)
            this.emit('released', action)
        }
    }


    isPressed (action) {
        return action in this.pressed
    }


    restore (map) {
        for (let action in map) {
            const actions = Array.isArray(map[action]) ? map[action] : [map[action]]

            actions.forEach((input, slot) => {
                if (input) {
                    this.setInputFor(action, input, slot)
                }
            })
        }
    }

}
