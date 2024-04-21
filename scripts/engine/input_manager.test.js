/**
 * @jest-environment jsdom
 */

import InputManager from './input_manager'
import InputMap from './input_map'
import jest from 'jest-mock'


describe(InputManager, () => {

    let inputManager

    beforeEach(() => {
        inputManager = new InputManager()
    })


    test('create', () => {
        const inputMap = inputManager.create('test')
        expect(inputMap).toBeInstanceOf(InputMap)
    })


    test('get', () => {
        const inputMap = inputManager.create('test')
        expect(inputManager.get('test')).toBe(inputMap)
    })


    test('list', () => {
        inputManager.create('test')
        expect(inputManager.list()).toEqual(['main', 'test'])
    })


    test('activate', () => {
        const inputMap = inputManager.create('test')
        inputManager.activate('test')
        expect(inputManager.activeMap.has(inputMap)).toBeTruthy()
    })


    test('mute', () => {
        const inputMap = inputManager.create('test')
        inputManager.activate('test')
        inputManager.mute('test')

        expect(inputManager.activeMap.has(inputMap)).toBeFalsy()
    })


    test('isActive', () => {
        inputManager.create('test')
        inputManager.activate('test')
        expect(inputManager.isActive('test')).toBeTruthy()
    })


    test('isActionPressed', () => {
        const inputMap = inputManager.create('test')
        inputManager.activate('test')
        inputMap.setInputFor('jump', 'Space')
        inputMap.press('Space')

        expect(inputManager.isActionPressed('jump')).toBeTruthy()
    })


    test('pressAction', () => {
        const inputMap = inputManager.create('test')
        inputManager.activate('test')
        inputMap.setInputFor('jump', 'Space')

        const callback = jest.fn()
        inputManager.on('action:pressed', callback)

        inputManager.pressAction('Space')
        expect(callback).toHaveBeenCalled()
    })


    test('releaseAction', () => {
        const inputMap = inputManager.create('test')
        inputManager.activate('test')
        inputMap.setInputFor('jump', 'Space')
        inputMap.press('Space')

        const callback = jest.fn()
        inputManager.on('action:released', callback)

        inputManager.releaseAction('Space')
        expect(callback).toHaveBeenCalled()
    })


    test('pressInput', () => {
        const callback = jest.fn()
        inputManager.on('input:pressed', callback)

        inputManager.pressInput('Space')
        expect(callback).toHaveBeenCalled()
    })


    test('releaseInput', () => {
        const callback = jest.fn()
        inputManager.on('input:released', callback)

        inputManager.pressInput('Space')
        inputManager.releaseInput('Space')
        expect(callback).toHaveBeenCalled()
    })


    test('isInputPressed', () => {
        inputManager.pressInput('Space')
        expect(inputManager.isInputPressed('Space')).toBeTruthy()
    })


    test('toArray', () => {
        const inputMap = inputManager.create('test')
        expect(inputManager.toArray()).toEqual([inputManager.mainInputMap, inputMap])
    })

})
