
export default class Queue {

    constructor () {
        this.queue = []
        this.running = false
    }

    add (fn) {
        this.queue.push(fn)
    }

    async run () {
        this.running = true

        while (this.queue.length) {
            const fn = this.queue.shift()
            await fn()
        }

        this.running = false
    }

}
