import Vector2Type from './data_types/vector_2_type'


export const dataTypes = {
    [Vector2Type.name]: Vector2Type
}


export function registerDataType (dataType) {
    dataTypes[dataType.name] = dataType
}


export function getDataType (name) {
    return dataTypes[name]
}


