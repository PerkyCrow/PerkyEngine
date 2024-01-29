/**
 * @jest-environment jsdom
 */

import RectangleRenderer from './rectangle_renderer'
import Rectangle from '../nodes/rectangle'
import {Graphics} from 'pixi.js'


describe(RectangleRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Rectangle()
        renderer = new RectangleRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(Graphics)
    })


})
