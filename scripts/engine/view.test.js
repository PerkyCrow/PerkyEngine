import View from './view'
import Node2D from './nodes/node_2d'
import Renderer from './renderer'
import ContainerRenderer from './renderers/container_renderer'

Renderer.setRenderer('Container', ContainerRenderer)


describe(View, () => {

    let view

    beforeEach(() => {
        view = new View()
    })


    test('addRendererFor', () => {
        const node = new Node2D()
        expect(view.renderers.get(node)).toBeUndefined()

        view.addRendererFor(node)

        const renderer = view.renderers.get(node)
        expect(renderer).toBeInstanceOf(Renderer)

        const child = new Node2D()
        node.addChild(child)

        view.addRendererFor(child)
        const childRenderer = view.renderers.get(child)
        expect(childRenderer).toBeInstanceOf(Renderer)

        expect(renderer.display.children).toStrictEqual([childRenderer.display])
    })


    test('removeRendererFor', () => {
        const node = new Node2D()

        const renderer = view.addRendererFor(node)
        expect(renderer).toBeInstanceOf(Renderer)

        const childNode = new Node2D()
        node.addChild(childNode)

        view.addRendererFor(childNode)

        view.removeRendererFor(childNode)
        expect(view.renderers.get(childNode)).toBeUndefined()
        expect(renderer.display.children).toStrictEqual([])
    })

})
