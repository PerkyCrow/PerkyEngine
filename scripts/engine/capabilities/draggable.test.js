import Node2D from '../nodes/node_2d'
import draggable from './draggable'
import ContainerRenderer from '../renderers/container_renderer'
import jest from 'jest-mock'


describe('draggable', () => {

    let node
    let renderer

    beforeEach(() => {
        node = new Node2D()
        renderer = new ContainerRenderer(node)
        node.use(draggable)
    })


    test('draggable', () => {
        expect(node.hasCapability(draggable)).toBe(true)
        expect(node.listCapabilities()).toEqual(['draggable'])
    })


    test('drag:start', () => {
        const listener = jest.fn()
        node.on('drag:start', listener)

        renderer.displayNotifier.emit('pointerdown')
        expect(node.dragging).toBe(true)
        expect(listener).toHaveBeenCalled()
    })


    test('drag:end', () => {
        const listener = jest.fn()
        node.on('drag:end', listener)

        renderer.displayNotifier.emit('pointerdown')
        renderer.displayNotifier.emit('pointerup')
        expect(node.dragging).toBe(false)
        expect(listener).toHaveBeenCalled()
    })


    test('drag:move', () => {
        const listener = jest.fn()
        node.on('drag:move', listener)

        renderer.displayNotifier.emit('pointerdown')
        renderer.displayNotifier.emit('globalmousemove', {
            data: {
                global: {
                    x: 10,
                    y: 20
                }
            }
        })

        expect(listener).toHaveBeenCalled()
        expect(node.position).toEqual({x: 10, y: 20})
    })

})
