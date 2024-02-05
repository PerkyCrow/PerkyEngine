/**
 * @jest-environment jsdom
 */


import Engine from './engine'
import Node2D from './nodes/node_2d'
import Renderer from './renderer'
import ContainerRenderer from './renderers/container_renderer'

Renderer.setRenderer('Container', ContainerRenderer)


describe(Engine, () => {

    let engine

    beforeEach(() => {
        engine = new Engine()
    })


    test('constructor', () => {
        expect(engine.world).toBeDefined()
        expect(engine.root).toBeDefined()
        expect(engine.view).toBeDefined()
        expect(engine.viewport).toBeDefined()
        expect(engine.animationLoop).toBeDefined()
    })


    test('init', () => {
        const {root, view} = engine
        const base = new Node2D()
        const container = new Node2D()

        root.addChild(base)
        base.addChild(container)

        const baseRenderer = view.renderers.get(base)
        expect(view.scene.children).toEqual([baseRenderer.display])


        const containerRenderer = view.renderers.get(container)
        expect(baseRenderer.display.children).toEqual([containerRenderer.display])
    })

})
