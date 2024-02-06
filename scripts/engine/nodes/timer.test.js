import Timer from './timer'
import jest from 'jest-mock'


describe('Timer', () => {


    let timer

    beforeEach(() => {
        timer = new Timer()
    })


    test('isTimer', () => {
        expect(timer.isTimer).toBe(true)
    })


    test('duration', () => {
        expect(timer.duration).toBe(1)
    })


    test('start', () => {
        const listener = jest.fn()
        timer.on('start', listener)
        timer.start()
        expect(timer.started).toBe(true)
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('stop', () => {
        const listener = jest.fn()
        timer.on('stop', listener)
        timer.start()
        timer.stop()
        expect(timer.started).toBe(false)
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('update', () => {
        const listener = jest.fn()
        timer.on('reached', listener)
        timer.start()
        timer.update(0.1)

        expect(timer.elapsedTime).toBe(0.1)

        timer.update(0.9)

        expect(timer.elapsedTime).toBe(0)
        expect(timer.iteration).toBe(1)
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('tick', () => {
        timer.start()
        timer.tick(0.1)

        expect(timer.elapsedTime).toBe(0.1)
    })


    test('end', () => {
        timer.start()
        timer.end()

        expect(timer.ended).toBe(true)
    })


    test('repeat', () => {
        expect(timer.repeat).toBe(1)
        timer.repeat = 2

        const listener = jest.fn()
        timer.on('reached', listener)

        timer.start()
        timer.update(1)

        expect(listener).toHaveBeenCalledTimes(1)

        timer.update(1)

        expect(listener).toHaveBeenCalledTimes(2)

        timer.update(1)

        expect(listener).toHaveBeenCalledTimes(2)
        expect(timer.ended).toBe(true)
    })

})
