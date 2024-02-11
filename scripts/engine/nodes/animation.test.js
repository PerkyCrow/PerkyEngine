import Animation from './animation'
import jest from 'jest-mock'


describe(Animation, () => {

    let animation
    let world = {emit: () => {}}

    beforeEach(() => {
        animation = new Animation()
        animation.setReady(world)
    })


    test('isAnimation', () => {
        expect(animation.isAnimation).toBe(true)
    })


    test('play', () => {
        const listener = jest.fn()
        animation.on('play', listener)
        animation.play()
        expect(animation.playing).toBe(true)
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('tick', () => {
        animation.play({duration: 1})
        animation.update(0.1)
        expect(animation.elapsedTime).toBe(0.1)
        animation.update(1)
        expect(animation.elapsedTime).toBe(1.1)
    })


    test('overflow', () => {
        const listener = jest.fn()
        animation.on('stop', listener)
        animation.play()
        animation.update(2)
        expect(animation.overflow).toBe(1)
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('stop', () => {
        const listener = jest.fn()
        animation.on('stop', listener)
        animation.play()
        animation.stop()
        expect(animation.playing).toBe(false)
        expect(listener).toHaveBeenCalledTimes(1)
    })

})
