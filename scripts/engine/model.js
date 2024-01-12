import Notifier from './notifier'
import {getDataType} from './types'


export default class Model extends Notifier {

    constructor () {
        super()
        this.attributes = {}
    }


    get keys () {
        return Object.keys(this.attributes)
    }


    get serializableKeys () {
        return this.keys.filter(key => this.attributes[key].serializable)
    }


    get exposableKeys () {
        return this.keys.filter(key => this.attributes[key].exposable)
    }


    setAttribute (key, {
        exposable  = true,
        serializable = true,
        watch      = false,
        accessor   = false,
        defaultValue,
        value      = typeof defaultValue === 'function' ? defaultValue() : defaultValue,
        type       = (typeof value === 'object' && value.type) || typeof value,
        options    = {}
    } = {}) {
        if (typeof key === 'string') {
            const attribute = {type, exposable, serializable, watch, accessor, defaultValue, options}
            this.attributes[key] = attribute

            const DataType = getDataType(type)

            Object.defineProperty(attribute, 'value', {
                enumerable: true,
                get: () => value,
                set:  v => {
                    let oldValue = value
                    if (oldValue !== v && DataType && DataType.cast) {
                        value = DataType.cast(v, options)
                    } else {
                        value = v
                    }

                    if (attribute.watch && oldValue !== value) {
                        this.emit(`changed:${key}`, value, oldValue)
                    }

                    return v
                }
            })

            if (accessor) {
                Object.defineProperty(this, key, {
                    enumerable: true,
                    get: () => attribute.value,
                    set:  v => {
                        attribute.value = v
                    }
                })
            }
        }
    }


    getAttribute (key) {
        return this.attributes[key]
    }


    getAttributeValue (key) {
        const attribute = this.getAttribute(key)

        if (attribute) {
            return attribute.value
        }

        return undefined
    }


    setAttributeValue (key, newValue) {
        const attribute = this.getAttribute(key)

        if (attribute) {
            attribute.value = newValue
        }
    }


    expose () {
        const data = {}

        for (let key in this.attributes) {
            const attribute = this.attributes[key]

            if (attribute.exposable) {
                data[key] = attribute.value
            }
        }

        return data
    }


    serialize () {
        const data = {}

        for (let key in this.attributes) {
            const attribute = this.attributes[key]

            if (attribute.serializable) {
                data[key] = serializeAttribute(attribute)
            }
        }

        return data
    }


    restore (data) {
        for (let key in data) {
            const attribute = this.attributes[key]

            if (attribute && attribute.serializable) {
                attribute.value = data[key]
            }
        }

        this.emit('restored')
    }

}



function serializeAttribute (attribute) {
    const {value, type} = attribute
    const DataType = getDataType(type)

    if (DataType && DataType.serialize) {
        return DataType.serialize(value, attribute.options)
    }

    return value
}
