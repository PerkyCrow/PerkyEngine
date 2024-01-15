import Asset from './asset'
import jest from 'jest-mock'


describe(Asset, () => {

    test('constructor', () => {
        const asset = new Asset({
            path: 'path',
            source: 'source',
            ext: 'ext',
            loader: 'loader',
            type: 'type'
        })

        expect(asset.path).toBe('path')
        expect(asset.source).toBe('source')
        expect(asset.ext).toBe('ext')
        expect(asset.loader).toBe('loader')
        expect(asset.type).toBe('type')
    })


    test('loaded', () => {
        const asset = new Asset({})

        expect(asset.loaded).toBe(false)

        asset.source = 'source'

        expect(asset.loaded).toBe(true)
    })


    test('load', () => {
        const asset = new Asset({
            path: 'path',
            loader: {
                load: jest.fn(() => Promise.resolve('source'))
            }
        })

        return asset.load().then(source => {
            expect(source).toBe('source')
            expect(asset.source).toBe('source')
            expect(asset.loader.load).toHaveBeenCalledWith('path')
        })
    })


    test('reload', () => {
        const asset = new Asset({
            path: 'path',
            loader: {
                load: jest.fn(() => Promise.resolve('source'))
            }
        })

        return asset.reload().then(source => {
            expect(source).toBe('source')
            expect(asset.source).toBe('source')
            expect(asset.loader.load).toHaveBeenCalledWith('path')
        })
    })

})
