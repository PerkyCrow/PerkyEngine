import Notifier from './notifier'


export default class InputMap extends Notifier {

    constructor () {
        super()
        this.map = new Map()
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

}
