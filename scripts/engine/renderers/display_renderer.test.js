import DisplayRenderer from './display_renderer'
import Node2D from '../nodes/node_2d'
import {Container} from 'pixi.js'
import jest from 'jest-mock'

import '../initializers/engine_initializer'


describe(DisplayRenderer, () => {

    let renderer
    let node
    let display


    beforeEach(() => {
        display = new Container()
        node = new Node2D()
        renderer = new DisplayRenderer(node)
        renderer.display = display
    })


    test('attributes', () => {
        expect(display.x).toBe(0)
        node.position.x = 10
        expect(display.x).toBe(10)
    })


    test('enableDisplayEvents', () => {
        renderer.enableDisplayEvents()
        expect(display.eventMode).toBe('dynamic')
        expect(renderer.displayNotifier).toBeDefined()
    })


    test('disasbleDisplayEvents', () => {
        renderer.enableDisplayEvents()
        renderer.disasbleDisplayEvents()
        expect(display.eventMode).toBe('auto')
    })


    test('onDisplay', () => {
        renderer.enableDisplayEvents()
        const listener = jest.fn()
        renderer.onDisplay('click', listener)
        display.emit('click')
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('offDisplay', () => {
        renderer.enableDisplayEvents()
        const listener = jest.fn()
        renderer.onDisplay('click', listener)
        renderer.offDisplay('click', listener)
        display.emit('click')
        expect(listener).toHaveBeenCalledTimes(0)
    })

})
