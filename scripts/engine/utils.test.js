import {
    getUrlExt,
    filterKeys
} from './utils'


describe('Utils', () => {

    test('getUrlExt', () => {
        expect(getUrlExt('http://www.google.com/logo.png')).toEqual('png')
    })


    test('filterKeys', () => {
        expect(filterKeys({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({a: 1, c: 3})
    })

})
