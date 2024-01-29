import AssetManifest from './asset_manifest'
import Asset from './asset'
import jest from 'jest-mock'


describe(AssetManifest, () => {

    let manifest
    let loader

    beforeEach(() => {
        manifest = new AssetManifest()

        loader = {
            load: jest.fn(() => Promise.resolve('source'))
        }
    })


    test('constructor', () => {
        expect(manifest.assets).toEqual({})
    })


    test('get', () => {
        const asset = new Asset({name: 'foo'})
        manifest.assets.foo = asset

        expect(manifest.get('foo')).toBe(asset)
    })


    test('getResource', () => {
        const asset = new Asset({name: 'foo', source: 'source'})
        manifest.assets.foo = asset

        expect(manifest.getResource('foo')).toBe('source')
    })


    test('loadAll', () => {
        const asset1 = new Asset({path: 'foo', loader})
        const asset2 = new Asset({path: 'bar', loader})
        const asset3 = new Asset({path: 'baz', loader})
        manifest.assets = {
            foo: asset1,
            bar: asset2,
            baz: asset3
        }

        return manifest.loadAll().then(sources => {
            expect(sources).toEqual(['source', 'source', 'source'])
        })
    })


    test('loadAll with filter', () => {
        const asset1 = new Asset({path: 'foo', loader})
        const asset2 = new Asset({path: 'bar', loader})
        const asset3 = new Asset({path: 'baz', loader})
        manifest.assets = {
            foo: asset1,
            bar: asset2,
            baz: asset3
        }

        return manifest.loadAll(asset => asset.path === 'bar').then(sources => {
            expect(sources).toEqual(['source'])
        })
    })


    test('add', () => {
        const asset = manifest.add({
            path: 'path',
            name: 'name',
            type: 'type',
            loader
        })

        expect(asset.path).toBe('path')
        expect(asset.name).toBe('name')
        expect(asset.type).toBe('type')
        expect(asset.loader).toBe(loader)
        expect(manifest.assets.name).toBe(asset)
    })

})
