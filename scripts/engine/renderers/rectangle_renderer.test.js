/**
 * @jest-environment jsdom
 */

import RectangleRenderer from './rectangle_renderer'
import Rectangle from '../nodes/rectangle'
import {Graphics, Container} from 'pixi.js'


describe(RectangleRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Rectangle()
        renderer = new RectangleRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(Container)
        expect(renderer.graphics).toBeInstanceOf(Graphics)
    })


})
