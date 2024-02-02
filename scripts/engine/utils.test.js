import {
    getUrlExt,
    filterKeys,
    interpolate,
    clamp,
    normalize,
    remap,
    smoothstep,
    easeIn,
    easeOut,
    easeInOut,
    randomBetween,
    randomIntBetween,
    randomPick
} from './utils'


describe('Utils', () => {

    test('getUrlExt', () => {
        expect(getUrlExt('http://www.google.com/logo.png')).toEqual('png')
    })


    test('filterKeys', () => {
        expect(filterKeys({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({a: 1, c: 3})
    })


    test('interpolate', () => {
        expect(interpolate(0, 10, 0.5)).toEqual(5)
        expect(interpolate(0, 10, 0.25)).toEqual(2.5)
        expect(interpolate(0, 10, 0)).toEqual(0)
        expect(interpolate(0, 10, 1)).toEqual(10)
    })


    test('clamp', () => {
        expect(clamp(5, 0, 10)).toEqual(5)
        expect(clamp(-5, 0, 10)).toEqual(0)
        expect(clamp(15, 0, 10)).toEqual(10)
    })


    test('normalize', () => {
        expect(normalize(5, 0, 10)).toEqual(0.5)
        expect(normalize(0, 0, 10)).toEqual(0)
        expect(normalize(10, 0, 10)).toEqual(1)
    })


    test('remap', () => {
        expect(remap(5, 0, 10, 0, 100)).toEqual(50)
        expect(remap(0, 0, 10, 0, 100)).toEqual(0)
        expect(remap(10, 0, 10, 0, 100)).toEqual(100)
    })


    test('smoothstep', () => {
        expect(smoothstep(0, 10, 5)).toEqual(0.5)
        expect(smoothstep(0, 10, 0)).toEqual(0)
        expect(smoothstep(0, 10, 10)).toEqual(1)
    })


    test('easeIn', () => {
        expect(easeIn(0.5)).toEqual(0.25)
        expect(easeIn(0)).toEqual(0)
        expect(easeIn(1)).toEqual(1)
    })


    test('easeOut', () => {
        expect(easeOut(0.5)).toEqual(0.75)
        expect(easeOut(0)).toEqual(0)
        expect(easeOut(1)).toEqual(1)
    })


    test('easeInOut', () => {
        expect(easeInOut(0.5)).toEqual(0.5)
        expect(easeInOut(0)).toEqual(0)
        expect(easeInOut(1)).toEqual(1)
    })


    test('randomBetween', () => {
        const value = randomBetween(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(10)
    })


    test('randomIntBetween', () => {
        const value = randomIntBetween(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(10)
        expect(value).toEqual(Math.floor(value))
    })


    test('randomPick', () => {
        const value = randomPick([1, 2, 3, 4, 5])
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(5)
    })

})
