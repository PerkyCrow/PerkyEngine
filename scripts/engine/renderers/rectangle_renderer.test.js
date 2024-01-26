/**
 * @jest-environment jsdom
 */

import RectangleRenderer from './rectangle_renderer'
import Rectangle from '../nodes/rectangle'
import {Graphics} from 'pixi.js'
import Vector2 from '../types/vector_2'


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


    test('anchor', () => {
        expect(renderer.anchor).toBeInstanceOf(Vector2)
        expect(renderer.anchor.x).toBe(0)
        expect(renderer.anchor.y).toBe(0)

        node.width = 10
        node.position.x = 0
        node.anchor.x = 0.5

        expect(renderer.display.x).toBe(-5)
    })

})
