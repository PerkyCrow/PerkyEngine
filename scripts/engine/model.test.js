import Model from './model'
import Vector2 from './types/vector_2'
import jest from 'jest-mock'


describe(Model, () => {

    let model

    beforeEach(() => {
        model = new Model()
    })


    test('setAttribute', () => {
        model.setAttribute('foo', {
            value: 'bar'
        })

        expect(model.attributes.foo.value).toEqual('bar')
    })


    test('keys', () => {
        model.setAttribute('foo', {
            value: 'bar'
        })

        expect(model.keys).toEqual(['foo'])
    })


    test('serializableKeys', () => {
        model.setAttribute('foo', {
            value: 'bar',
            serializable: true
        })

        model.setAttribute('baz', {
            value: 'qux',
            serializable: false
        })

        expect(model.serializableKeys).toEqual(['foo'])
    })


    test('exposableKeys', () => {
        model.setAttribute('foo', {
            value: 'bar',
            exposable: true
        })

        model.setAttribute('baz', {
            value: 'qux',
            exposable: false
        })

        expect(model.exposableKeys).toEqual(['foo'])
    })


    test('watch', () => {
        model.setAttribute('foo', {
            value: 'bar',
            watch: true
        })

        const callback = jest.fn()
        model.on('changed:foo', callback)

        model.attributes.foo.value = 'baz'

        expect(callback).toHaveBeenCalledWith('baz', 'bar')
    })


    test('accessor', () => {
        model.setAttribute('foo', {
            value: 'bar',
            accessor: true
        })

        model.foo = 'baz'

        expect(model.foo).toEqual('baz')
    })


    test('default value', () => {
        model.setAttribute('foo', {
            defaultValue: 'bar'
        })

        expect(model.attributes.foo.value).toEqual('bar')
    })


    test('default value as function', () => {
        model.setAttribute('foo', {
            defaultValue: () => 'bar'
        })

        expect(model.attributes.foo.value).toEqual('bar')
    })


    test('type', () => {
        model.setAttribute('foo', {
            type: 'string'
        })

        expect(model.attributes.foo.type).toEqual('string')

        model.setAttribute('bar', {
            value: new Vector2(0, 0)
        })

        expect(model.attributes.bar.type).toEqual('Vector2')
    })


    test('updateAttribute', () => {
        model.setAttribute('foo', {
            value: 'bar',
            accessor: true
        })

        expect(model.foo).toEqual('bar')

        model.foo = 'baz'

        expect(model.attributes.foo.value).toEqual('baz')

        model.updateAttribute('foo', {
            value: 'baz',
            accessor: false
        })

        expect(model.foo).toBe(undefined)

        expect(model.attributes.foo.value).toEqual('baz')
    })


    test('serialize', () => {
        model.setAttribute('foo', {
            value: 'bar',
            serializable: true
        })

        expect(model.serialize()).toEqual({foo: 'bar'})


        model.setAttribute('bar', {
            value: new Vector2(1, 2),
            serializable: true
        })


        expect(model.serialize()).toEqual({foo: 'bar', bar: {x: 1, y: 2}})
    })


    test('restore', () => {
        model.setAttribute('foo', {
            value: 'bar',
            serializable: true
        })

        model.restore({foo: 'baz'})

        expect(model.attributes.foo.value).toEqual('baz')


        model.setAttribute('bar', {
            value: new Vector2(1, 2),
            serializable: true
        })

        model.restore({bar: {x: 3, y: 4}})

        expect(model.attributes.bar.value).toEqual(new Vector2(3, 4))
        expect(model.serialize()).toEqual({foo: 'baz', bar: {x: 3, y: 4}})

    })

})
