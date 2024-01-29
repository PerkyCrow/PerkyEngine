import Rectangle from './rectangle'


describe(Rectangle, () => {

    let node

    beforeEach(() => {
        node = new Rectangle()
    })


    test('attributes', () => {
        expect(node.width).toBe(1)
        expect(node.height).toBe(1)
    })


    test('isRectangle', () => {
        expect(node.isRectangle).toBe(true)
    })

})
