import Layer from './layer'


describe(Layer, () => {

    let node

    beforeEach(() => {
        node = new Layer()
    })


    test('scaleToFit', () => {
        const target = {width: 100, height: 100}
        node.width = 50
        node.height = 50

        node.scaleToFit(target)

        expect(node.scale.x).toBe(2)
        expect(node.scale.y).toBe(2)
    })


    test('isLayer', () => {
        expect(node.isLayer).toBe(true)
    })

})
