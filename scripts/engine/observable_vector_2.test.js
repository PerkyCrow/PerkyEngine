import ObservableVector2 from './observable_vector_2'
import Vector2 from './vector_2'
import jest from 'jest-mock'


describe(ObservableVector2, () => {

    test('constructor', () => {
        const onChange = jest.fn()
        const vector = new ObservableVector2(1, 2, onChange)
        expect(vector.x).toEqual(1)
        expect(vector.y).toEqual(2)
        expect(onChange).not.toHaveBeenCalled()

        vector.x = 3
        expect(vector.x).toEqual(3)
        expect(vector.y).toEqual(2)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(vector, new Vector2(1, 2))

        vector.y = 4
        expect(vector.x).toEqual(3)
        expect(vector.y).toEqual(4)
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenCalledWith(vector, new Vector2(3, 2))

        vector.x = 3
        expect(vector.x).toEqual(3)
        expect(vector.y).toEqual(4)
        expect(onChange).toHaveBeenCalledTimes(2)

        vector.y = 4
        expect(vector.x).toEqual(3)
        expect(vector.y).toEqual(4)
        expect(onChange).toHaveBeenCalledTimes(2)

        const vector2 = new ObservableVector2({x: 5, y: 6}, onChange)
        expect(vector2.x).toEqual(5)
        expect(vector2.y).toEqual(6)
        expect(onChange).toHaveBeenCalledTimes(2)

        vector2.x = 7
        expect(vector2.x).toEqual(7)
        expect(vector2.y).toEqual(6)
        expect(onChange).toHaveBeenCalledTimes(3)
    })


    test('toObservableVector2', () => {
        const onChange = jest.fn()
        const vector = new ObservableVector2(1, 2, onChange)
        expect(ObservableVector2.toObservableVector2(vector)).toEqual(vector)
        expect(ObservableVector2.toObservableVector2(new Vector2(1, 2), onChange)).toEqual(vector)
        expect(ObservableVector2.toObservableVector2(1, 2, onChange)).toEqual(vector)
    })


    test('cast', () => {
        const onChange = jest.fn()
        const vector = new ObservableVector2(1, 2, onChange)
        expect(ObservableVector2.cast(vector)).toEqual(vector)
        expect(ObservableVector2.cast(new Vector2(1, 2), onChange)).toEqual(vector)
        expect(ObservableVector2.cast([1, 2], onChange)).toEqual(vector)
        expect(ObservableVector2.cast({x: 1, y: 2}, onChange)).toEqual(vector)
    })


    test('serialize', () => {
        const onChange = jest.fn()
        const vector = new ObservableVector2(1, 2, onChange)
        expect(ObservableVector2.serialize(vector)).toEqual({x: 1, y: 2})
    })

})
