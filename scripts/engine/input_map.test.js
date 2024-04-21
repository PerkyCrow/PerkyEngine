import InputMap from './input_map'
import jest from 'jest-mock'


describe(InputMap, () => {

    let inputMap

    beforeEach(() => {
        inputMap = new InputMap()
    })


    test('setInputFor', () => {
        inputMap.setInputFor('jump', 'Space')
        expect(inputMap.map.get('jump')[0]).toEqual('Space')

        inputMap.setInputFor('jump', 'W', 1)
        expect(inputMap.map.get('jump')[1]).toEqual('W')
    })


    test('removeInputFor', () => {
        inputMap.setInputFor('jump', 'Space')
        inputMap.removeInputFor('jump')

        expect(inputMap.map.get('jump')[0]).toBeNull()
    })


    test('getInputFor', () => {
        inputMap.setInputFor('jump', 'Space')
        expect(inputMap.getInputFor('jump')).toEqual('Space')

        inputMap.setInputFor('jump', 'W', 1)
        expect(inputMap.getInputFor('jump', 1)).toEqual('W')
    })


    test('set:input', () => {
        const callback = jest.fn()
        inputMap.on('set:input', callback)

        inputMap.setInputFor('jump', 'Space')

        expect(callback).toHaveBeenCalledWith('Space', 0, 'jump')
    })


    test('removed:input', () => {
        const callback = jest.fn()
        inputMap.on('removed:input', callback)

        inputMap.setInputFor('jump', 'Space')
        inputMap.removeInputFor('jump')

        expect(callback).toHaveBeenCalledWith('jump', 0)
    })


    test('getActionsFor', () => {
        inputMap.setInputFor('jump', 'Space')
        inputMap.setInputFor('W', 'Space')

        expect(inputMap.getActionsFor('Space')).toEqual(['jump', 'W'])
    })


    test('getActionFor', () => {
        inputMap.setInputFor('jump', 'Space')
        inputMap.setInputFor('jump', 'W', 1)

        expect(inputMap.getActionFor('Space')).toEqual('jump')
        expect(inputMap.getActionFor('W')).toEqual('jump')
    })


    test('isMapped', () => {
        inputMap.setInputFor('jump', 'Space')
        expect(inputMap.isMapped('Space')).toBeTruthy()

        inputMap.removeInputFor('jump')
        expect(inputMap.isMapped('Space')).toBeFalsy()
    })


    test('press', () => {
        const callback = jest.fn()
        inputMap.on('pressed:jump', callback)

        inputMap.setInputFor('jump', 'Space')
        inputMap.press('Space')

        expect(callback).toHaveBeenCalled()
    })


    test('release', () => {
        const callback = jest.fn()
        inputMap.on('released:jump', callback)

        inputMap.setInputFor('jump', 'Space')
        inputMap.press('Space')
        inputMap.release('Space')

        expect(callback).toHaveBeenCalled()
    })


    test('isPressed', () => {
        inputMap.setInputFor('jump', 'Space')
        inputMap.press('Space')

        expect(inputMap.isPressed('jump')).toBeTruthy()
    })

})
