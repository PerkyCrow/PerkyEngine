/**
 * @jest-environment jsdom
 */

import SpriteRenderer from './sprite_renderer'
import Sprite from '../nodes/sprite'
import {Sprite as PixiSprite} from 'pixi.js'


describe(SpriteRenderer, () => {

    let renderer
    let node

    beforeEach(() => {
        node = new Sprite()
        renderer = new SpriteRenderer(node)
    })


    test('display', () => {
        expect(renderer.display).toBeInstanceOf(PixiSprite)
    })

})
