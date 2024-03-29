/**
 * @jest-environment jsdom
 */


import Viewport from './viewport'


describe(Viewport, () => {

    let viewport

    beforeEach(() => {
        viewport = new Viewport()

    })


    test('constructor', async () => {
        expect(viewport.container).toBeInstanceOf(HTMLElement)

        // expect(viewport.adapter).toBeInstanceOf(AbstractRenderer)
    })


})