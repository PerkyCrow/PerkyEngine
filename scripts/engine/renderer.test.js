import Renderer from './renderer'
import Node from './node'
import jest from 'jest-mock'


describe(Renderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Node()
        renderer = new Renderer(node)
    })


    test('constructor', () => {
        expect(renderer.node).toBe(node)
    })


    test('onNode', () => {
        const spy = jest.fn()
        renderer.onNode('changed', spy)
        node.emit('changed')

        expect(spy).toHaveBeenCalledTimes(1)
    })


    test('offNode', () => {
        const spy = jest.fn()
        renderer.onNode('changed', spy)
        renderer.offNode('changed')
        node.emit('changed')

        expect(spy).toHaveBeenCalledTimes(0)
    })


    test('destroy', () => {
        const spy = jest.fn()
        renderer.onNode('changed', spy)
        renderer.destroy()
        node.emit('changed')

        expect(spy).toHaveBeenCalledTimes(0)
    })

})
