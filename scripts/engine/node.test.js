import Node from './node'
import jest from 'jest-mock'


describe(Node, () => {

    let node
    let world

    beforeEach(() => {
        node = new Node()
        world = {
            on: jest.fn(),
            emit: jest.fn()
        }
    })


    test('type', () => {
        expect(node.type).toBe('Node')

        class Foo extends Node {}
        const foo = new Foo()

        expect(foo.type).toBe('Foo')
    })


    test('root', () => {
        expect(node.root).toBe(node)

        const child = new Node()
        node.attachChild(child)

        expect(child.root).toBe(node)

        const grandchild = new Node()
        child.attachChild(grandchild)

        expect(grandchild.root).toBe(node)
    })


    test('isRoot', () => {
        expect(node.isRoot).toBe(true)

        const child = new Node()
        node.attachChild(child)

        expect(child.isRoot).toBe(false)

        const grandchild = new Node()
        child.attachChild(grandchild)

        expect(grandchild.isRoot).toBe(false)
    })


    test('attachChild', () => {
        const child = new Node()

        expect(node.attachChild(child)).toBe(true)
        expect(node.children).toContain(child)
        expect(child.parent).toBe(node)

        expect(node.attachChild(child)).toBe(false)
    })


    test('addChild', () => {
        const child = new Node()

        expect(node.addChild(child)).toBe(true)
        expect(node.children).toContain(child)
        expect(child.parent).toBe(node)

        expect(node.addChild(child)).toBe(true)
    })


    test('detachChild', () => {
        const child = new Node()
        node.attachChild(child)

        expect(node.detachChild(child)).toBe(true)
        expect(node.children).not.toContain(child)
        expect(child.parent).toBe(null)

        expect(node.detachChild(child)).toBe(false)
    })


    test('removeChild', () => {
        const child = new Node()
        node.attachChild(child)

        expect(node.removeChild(child)).toBe(true)
        expect(node.children).not.toContain(child)
        expect(child.parent).toBe(null)
    })


    test('destroy', () => {
        const child = new Node()
        node.attachChild(child)

        child.destroy()

        expect(node.children).not.toContain(child)
        expect(child.parent).toBe(null)
    })


    test('setReady', () => {
        const child = new Node()

        node.attachChild(child)
        expect(child.ready).toBe(false)

        node.setReady(world)
        expect(child.ready).toBe(true)
    })


    test('ready', () => {
        expect(node.ready).toBe(false)

        node.setReady(world)

        expect(node.ready).toBe(true)

        const child = new Node()
        node.attachChild(child)

        expect(child.ready).toBe(true)
    })


    describe('events', () => {

        test('ready', () => {
            const child = new Node()
            const listener = jest.fn()
            child.on('ready', listener)

            node.ready = true
            node.world = world
            node.attachChild(child)
            expect(listener).toHaveBeenCalled()
        })


        test('attached', () => {
            const child = new Node()
            const listener = jest.fn()
            child.on('attached', listener)

            node.attachChild(child)
            expect(listener).toHaveBeenCalledWith(node)
        })


        test('detached', () => {
            const child = new Node()
            const listener = jest.fn()
            child.on('detached', listener)

            node.attachChild(child)
            node.detachChild(child)
            expect(listener).toHaveBeenCalledWith(node)
        })


        test('destroyed', () => {
            const child = new Node()
            const listener = jest.fn()
            child.on('destroyed', listener)

            node.attachChild(child)
            child.destroy()
            expect(listener).toHaveBeenCalledWith(node)
        })


        test('destroyed (nested)', () => {
            const child = new Node()
            const grandchild = new Node()
            const listener = jest.fn()
            grandchild.on('destroyed', listener)

            node.attachChild(child)
            child.attachChild(grandchild)
            child.destroy()
            expect(listener).toHaveBeenCalledWith(child)
        })


        test('update', () => {
            const listener = jest.fn()
            node.on('update', listener)
            node.ready = false
            node.update()
            expect(listener).not.toHaveBeenCalled()

            node.ready = true
            node.update()
            expect(listener).toHaveBeenCalled()
        })


        test('updated', () => {
            const listener = jest.fn()
            node.on('updated', listener)
            node.ready = false
            node.update()
            expect(listener).not.toHaveBeenCalled()

            node.ready = true
            node.update()
            expect(listener).toHaveBeenCalled()
        })

    })

})
