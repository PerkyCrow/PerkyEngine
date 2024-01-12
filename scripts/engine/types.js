import Vector2 from './vector_2'
import ObservableVector2 from './observable_vector_2'


export const types = {}

registerDataType(
    ObservableVector2,
    Vector2
)


export function registerDataType (...newTypes) {
    for (const Type of newTypes) {
        types[Type.name] = Type
    }
}


export function getDataType (name) {
    return types[name]
}
