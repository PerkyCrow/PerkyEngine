/**
 * @jest-environment jsdom
 */


import Viewport from './viewport'
import {Renderer} from '@pixi/core'


describe(Viewport, () => {

    let viewport

    beforeEach(() => {
        viewport = new Viewport()
    })


    test('constructor', () => {
        expect(viewport.container).toBeInstanceOf(HTMLElement)
        expect(viewport.pixiRenderer).toBeInstanceOf(Renderer)
    })


})