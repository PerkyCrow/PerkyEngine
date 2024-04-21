import Notifier from './notifier'


const inputToInputName = {
    ' ': 'Space'
}


export default class InputObserver extends Notifier {

    constructor ({container = window, inputToName = {}} = {}) {
        super()
        this.pressed = {}
        this.inputToName = inputToName

        listenToInputs(this, container)
    }


    press (inputName) {
        if (this.listening && !this.isInputPressed(inputName)) {
            this.pressed[inputName] = 1
            this.emit(`pressed:${inputName}`)
            this.emit('pressed', inputName)
        }
    }


    release (inputName) {
        if (this.listening && this.isInputPressed(inputName)) {
            delete this.pressed[inputName]
            this.emit(`released:${inputName}`)
            this.emit('released', inputName)
        }
    }


    isInputPressed (inputName) {
        return inputName in this.pressed
    }


    clear () {
        for (let inputName in this.pressed) {
            delete this.pressed[inputName]
        }
    }


    pause () {
        this.listening = false
    }


    stop () {
        this.pause()
        this.clear()
    }


    resume () {
        this.listening = true
    }


    transformInputToName (input) {
        let name = inputToInputName[input] || input
        name = this.inputToName[name] || name
        return name
    }

}


function listenToInputs (inputObserver, element) {
    element.addEventListener('keydown', (event) => {
        let name = inputObserver.transformInputToName(event.key)
        inputObserver.press(name)
    })

    element.addEventListener('keyup', (event) => {
        let name = inputObserver.transformInputToName(event.key)
        inputObserver.release(name)
    })

    window.addEventListener('blur', () => inputObserver.clear())

    inputObserver.resume()
}