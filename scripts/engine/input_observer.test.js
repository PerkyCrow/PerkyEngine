/**
 * @jest-environment jsdom
 */

import InputObserver from './input_observer'
import jest from 'jest-mock'


describe(InputObserver, () => {

    let inputObserver

    beforeEach(() => {
        inputObserver = new InputObserver()
    })


    test('press', () => {
        const callback = jest.fn()
        inputObserver.on('pressed:Space', callback)

        inputObserver.press('Space')

        expect(callback).toHaveBeenCalled()
    })


    test('release', () => {
        const callback = jest.fn()
        inputObserver.on('released:Space', callback)

        inputObserver.press('Space')
        inputObserver.release('Space')

        expect(callback).toHaveBeenCalled()
    })


    test('isPressed', () => {
        inputObserver.press('Space')
        expect(inputObserver.isPressed('Space')).toBeTruthy()
    })


    test('clear', () => {
        inputObserver.press('Space')
        inputObserver.clear()
        expect(inputObserver.isPressed('Space')).toBeFalsy()
    })


    test('pause', () => {
        inputObserver.pause()
        expect(inputObserver.listening).toBeFalsy()
    })


    test('stop', () => {
        inputObserver.press('Space')
        inputObserver.stop()
        expect(inputObserver.isPressed('Space')).toBeFalsy()
        expect(inputObserver.listening).toBeFalsy()
    })


    test('resume', () => {
        inputObserver.pause()
        inputObserver.resume()
        expect(inputObserver.listening).toBeTruthy()
    })

})