import Node from './node'
import jest from 'jest-mock'


describe(Node, () => {

    let node

    beforeEach(() => {
        node = new Node()
    })


    // Needs to be first because id is a global variable
    test('id', () => {
        expect(node.id).toBe(0)

        const child = new Node()
        node.attachChild(child)

        expect(child.id).toBe(1)
    })


    test('name', () => {
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
    })


    test('isRoot', () => {
        expect(node.isRoot()).toBe(true)

        const child = new Node()
        node.attachChild(child)

        expect(child.isRoot()).toBe(false)
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


    test('onAttach', () => {
        const child = new Node()
        child.onAttach = jest.fn()
        node.attachChild(child)

        expect(child.onAttach).toHaveBeenCalledWith(node)
    })


    test('onDetach', () => {
        const child = new Node()
        child.onDetach = jest.fn()
        node.attachChild(child)
        node.detachChild(child)

        expect(child.onDetach).toHaveBeenCalledWith(node)
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
        child.setReady = jest.fn()
        node.attachChild(child)

        node.setReady()

        expect(child.setReady).toHaveBeenCalled()
    })


    test('ready', () => {
        expect(node.ready).toBe(false)

        node.setReady()

        expect(node.ready).toBe(true)

        const child = new Node()
        node.attachChild(child)

        expect(child.ready).toBe(true)
    })

})
