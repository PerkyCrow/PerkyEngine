import ObservableVector2Type from './observable_vector_2_type'
import ObservableVector2 from '../observable_vector_2'
import Vector2 from '../vector_2'


describe('ObservableVector2Type', () => {

    test('cast', () => {
        const onChange = () => {
            console.log('hello')
        }
        const vector = new ObservableVector2(1, 2, onChange)
        expect(ObservableVector2Type.cast(vector)).toEqual(vector)
        console.log(ObservableVector2Type.cast({x: 1, y: 2}, {onChange}))
        // expect(ObservableVector2Type.cast({x: 1, y: 2}, {onChange})).toEqual(vector)
    })

})