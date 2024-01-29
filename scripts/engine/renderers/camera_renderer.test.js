import CameraRenderer from './camera_renderer'
import Camera from '../nodes/camera'
import {Container} from 'pixi.js'


describe(CameraRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Camera()
        renderer = new CameraRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(Container)
    })

})
