import Registry from './registry'


describe(Registry, () => {

    it('constructor', () => {
        const registry = new Registry()

        registry.set('foo', 'bar')
        expect(registry.get('foo')).toBe('bar')

        class Foo {}
        registry.set('foo', Foo)
        expect(registry.get('foo')).toBe(Foo)
    })


    it('instantiate', () => {
        const registry = new Registry()

        registry.set('foo', 'bar')
        expect(registry.instantiate('foo')).toBeNull()

        class Foo {}
        registry.set('foo', Foo)
        expect(registry.instantiate('foo')).toBeInstanceOf(Foo)

        class Bar {
            constructor (a) {
                this.a = a
            }
        }

        registry.set('bar', Bar)
        expect(registry.instantiate('bar', 'baz').a).toBe('baz')
    })


    it('call', () => {
        const registry = new Registry()

        registry.set('foo', 'bar')
        expect(registry.call('foo', 'baz')).toBeNull()

        class Foo {
            static baz () {
                return 'baz'
            }
        }

        registry.set('foo', Foo)
        expect(registry.call('foo', 'baz')).toBe('baz')
    })


    it('read', () => {
        const registry = new Registry()

        registry.set('foo', 'bar')
        expect(registry.read('foo', 'baz')).toBeNull()

        const foo = {
            baz: 'baz'
        }

        registry.set('foo', foo)
        expect(registry.read('foo', 'baz')).toBe('baz')
    })


    it('addClass', () => {
        const registry = new Registry()

        class Foo {}
        class Bar {}

        registry.addClass(Foo, Bar)
        expect(registry.get('Foo')).toBe(Foo)
        expect(registry.get('Bar')).toBe(Bar)
    })

})
