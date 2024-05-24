import Physics2D from './physics_2d'
import Vector2 from '../vector_2'



describe(Physics2D, () => {

    let node
    let world = {emit: () => {}}

    beforeEach(() => {
        node = new Physics2D()
    })


    test('constructor', () => {
        expect(node.isPhysics2D).toBe(true)
        expect(node.velocity.x).toBe(0)
        expect(node.velocity.y).toBe(0)
        expect(node.acceleration.x).toBe(0)
        expect(node.acceleration.y).toBe(0)
        expect(node.angularVelocity).toBe(0)
    })


    test('update', () => {
        node.setReady(world)

        node.velocity = new Vector2(1, 0)
        node.update(1)
        expect(node.position.x).toBe(1)

        node.position = new Vector2(0, 0)
        node.velocity = new Vector2(0, 0)
        node.acceleration = new Vector2(1, 0)
        node.update(1)
        expect(node.position.x).toBe(1)

        node.position = new Vector2(0, 0)
        node.velocity = new Vector2(0, 0)
        node.acceleration = new Vector2(0, 0)
        node.angularVelocity = 1
        node.update(1)
        expect(node.rotation).toBe(1)
    })

})