import World from './world'
import Node from './node'
import jest from 'jest-mock'


describe(World, () => {

    it('constructor', () => {
        const world = new World()

        expect(world.root).toBeNull()
    })


    it('attachRoot', () => {
        const world = new World()
        const node  = new Node()

        expect(world.attachRoot(node)).toBe(true)
        expect(world.root).toBe(node)
        expect(node.root).toBe(node)

        expect(world.attachRoot(node)).toBe(false)
    })


    it('update', () => {
        const world = new World()
        const node  = new Node()

        world.attachRoot(node)

        const spy = jest.fn()
        world.on('update', spy)

        world.update(1)
        expect(spy).toHaveBeenCalledWith(1)

        world.update(2)
        expect(spy).toHaveBeenCalledWith(2)
    })


    it('serialize', () => {
        const world = new World()
        const node  = new Node()

        world.attachRoot(node)

        expect(world.serialize()).toEqual({
            root: node.serialize()
        })
    })


    it('import', () => {
        const world = World.import({
            root: {
                type: 'Node'
            }
        })

        expect(world.root).toBeInstanceOf(Node)
    })

})
