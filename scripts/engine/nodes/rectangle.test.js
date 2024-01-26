import Rectangle from './rectangle'
import ObservableVector2 from '../types/observable_vector_2'
import jest from 'jest-mock'


describe(Rectangle, () => {

    let node

    beforeEach(() => {
        node = new Rectangle()
    })


    test('attributes', () => {
        expect(node.anchor).toBeInstanceOf(ObservableVector2)
        expect(node.anchor.x).toBe(0)
        expect(node.anchor.y).toBe(0)
        expect(node.width).toBe(1)
        expect(node.height).toBe(1)

        const anchorChanged = jest.fn()
        node.on('changed:anchor', anchorChanged)
        node.anchor.x = 3
        expect(anchorChanged).toHaveBeenCalledTimes(1)
    })


    test('isRectangle', () => {
        expect(node.isRectangle).toBe(true)
    })

})
