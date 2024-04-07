import LayerRenderer from './layer_renderer'
import Layer from '../nodes/layer'
import {Container} from 'pixi.js'


describe(LayerRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Layer()
        renderer = new LayerRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(Container)
    })

})
