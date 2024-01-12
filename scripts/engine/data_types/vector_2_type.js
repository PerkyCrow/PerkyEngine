import AnyType from './any_type'
import Vector2 from '../vector_2'


export default class Vector2Type extends AnyType {

    static name = 'Vector2'

    static cast (value) {
        if (value instanceof Vector2) {
            return value
        }

        if (Array.isArray(value)) {
            return new Vector2(value[0], value[1])
        }

        if (typeof value === 'object' || typeof value === 'number') {
            return new Vector2(value)
        }

        if (typeof value === 'string') {
            return new Vector2(...value.split(',').map(parseFloat))
        }

        return Vector2.zero
    }

    static serialize (value) {
        return value.serialize()
    }

    static is (value) {
        return value instanceof Vector2
    }

}
