import ContainerRenderer from './container_renderer'
import Node2D from '../nodes/node_2d'
import {Container} from 'pixi.js'


describe(ContainerRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Node2D()
        renderer = new ContainerRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(Container)
    })

})
