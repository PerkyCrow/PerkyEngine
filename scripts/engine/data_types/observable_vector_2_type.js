import Vector2Type from './vector_2_type'
import ObservableVector2 from '../observable_vector_2'


const name = 'ObservableVector2'


function cast (value, {onChange} = {}) {
    if (!is(value)) {
        value = new ObservableVector2(Vector2Type.cast(value))
    }

    if (value.onChange !== onChange) {
        value.onChange = onChange
    }

    return value
}


function is (value) {
    return value instanceof ObservableVector2
}


function serialize (value) {
    return value.serialize()
}


export default {
    name,
    cast,
    serialize,
    is
}