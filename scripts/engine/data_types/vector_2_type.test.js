import Vector2Type from './vector_2_type'
import Vector2 from '../vector_2'


describe('Vector2Type', () => {

    test('cast', () => {
        expect(Vector2Type.cast(new Vector2(1, 2))).toEqual(new Vector2(1, 2))
        expect(Vector2Type.cast({x: 1, y: 2})).toEqual(new Vector2(1, 2))
        expect(Vector2Type.cast([1, 2])).toEqual(new Vector2(1, 2))
        expect(Vector2Type.cast(1)).toEqual(new Vector2(1, 1))
        expect(Vector2Type.cast('1,2')).toEqual(new Vector2(1, 2))
    })


    test('export', () => {
        expect(Vector2Type.export(new Vector2(1, 2))).toEqual({x: 1, y: 2})
    })


    test('restore', () => {
        expect(Vector2Type.restore({x: 1, y: 2})).toEqual(new Vector2(1, 2))
    })


    test('is', () => {
        expect(Vector2Type.is(new Vector2(1, 2))).toBe(true)
        expect(Vector2Type.is({x: 1, y: 2})).toBe(false)
        expect(Vector2Type.is([1, 2])).toBe(false)
        expect(Vector2Type.is(1)).toBe(false)
        expect(Vector2Type.is('1,2')).toBe(false)
    })

})
