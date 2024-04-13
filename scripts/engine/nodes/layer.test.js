import Layer from './layer'


describe(Layer, () => {

    let node

    beforeEach(() => {
        node = new Layer()
    })


    test('scaleToContain', () => {
        const target = {width: 100, height: 100}
        node.width = 50
        node.height = 50

        node.scaleToContain(target)

        expect(node.scale.x).toBe(2)
        expect(node.scale.y).toBe(2)
    })


    test('scaleToCover', () => {
        const target = {width: 100, height: 100}
        node.width = 50
        node.height = 50

        node.scaleToCover(target)

        expect(node.scale.x).toBe(2)
        expect(node.scale.y).toBe(2)
    })


    test('stretchToCover', () => {
        const target = {width: 200, height: 100}
        node.width = 50
        node.height = 50

        node.stretchToCover(target)

        expect(node.scale.x).toBe(4)
        expect(node.scale.y).toBe(2)
    })


    test('isLayer', () => {
        expect(node.isLayer).toBe(true)
    })

})
