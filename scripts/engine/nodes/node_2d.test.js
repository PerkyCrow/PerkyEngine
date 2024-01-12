import Node from '../node'
import Node2D from './node_2d'
import Vector2 from '../vector_2'

describe(Node2D, () => {

    let node

    beforeEach(() => {
        node = new Node2D()
    })


    test('attributes', () => {
        expect(node.position).toEqual(new Vector2(0, 0))
        expect(node.rotation).toBe(0)
        expect(node.scale).toEqual(new Vector2(1, 1))
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
