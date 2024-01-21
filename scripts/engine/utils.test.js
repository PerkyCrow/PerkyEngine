import {
    getUrlExt
} from './utils'


describe('Utils', () => {

    test('getUrlExt', () => {
        expect(getUrlExt('http://www.google.com/logo.png')).toEqual('png')
    })

})
