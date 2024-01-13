import Node from '../node'
import Node2D from './node_2d'
import ObservableVector2 from '../types/observable_vector_2'
import jest from 'jest-mock'


describe(Node2D, () => {

    let node

    beforeEach(() => {
        node = new Node2D()
    })


    test('attributes', () => {
        expect(node.position).toBeInstanceOf(ObservableVector2)
        expect(node.position.x).toBe(0)
        expect(node.position.y).toBe(0)
        expect(node.rotation).toBe(0)

        expect(node.scale).toBeInstanceOf(ObservableVector2)
        expect(node.scale.x).toBe(1)
        expect(node.scale.y).toBe(1)

        expect(node.pivot).toBeInstanceOf(ObservableVector2)
        expect(node.pivot.x).toBe(0)
        expect(node.pivot.y).toBe(0)

        node.position = {x: 1, y: 2}
        expect(node.position).toBeInstanceOf(ObservableVector2)
        expect(node.position.x).toBe(1)
        expect(node.position.y).toBe(2)

        const positionChanged = jest.fn()
        node.on('changed:position', positionChanged)
        node.position.x = 3
        expect(positionChanged).toHaveBeenCalledTimes(1)
    })


    test('is2D', () => {
        expect(node.is2D).toBe(true)
    })


    test('parent2D', () => {
        expect(node.parent2D).toBe(null)

        const parent = new Node()
        parent.attachChild(node)

        expect(node.parent2D).toBe(null)

        const grandparent = new Node2D()
        grandparent.attachChild(parent)
    })

})
