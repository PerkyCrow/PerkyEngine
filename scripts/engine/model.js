import Notifier from './notifier'
import {getDataType} from './data_types'


export default class Model extends Notifier {

    constructor () {
        super()
        this.attributes = {}
    }


    get keys () {
        return Object.keys(this.attributes)
    }


    get exportableKeys () {
        return this.keys.filter(key => this.attributes[key].exportable)
    }


    get exposableKeys () {
        return this.keys.filter(key => this.attributes[key].exposable)
    }


    setAttribute (key, {
        exposable  = true,
        exportable = true,
        watch      = false,
        accessor   = false,
        defaultValue,
        value      = typeof defaultValue === 'function' ? defaultValue() : defaultValue,
        type       = (typeof value === 'object' && value.type) || typeof value
    } = {}) {
        if (typeof key === 'string') {
            const attribute = {type, exposable, exportable, watch, accessor, defaultValue}
            this.attributes[key] = attribute

            Object.defineProperty(attribute, 'value', {
                enumerable: true,
                get: () => value,
                set:  v => {
                    let oldValue = value
                    value = v

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


    export () {
        const data = {}

        for (let key in this.attributes) {
            const attribute = this.attributes[key]

            if (attribute.exportable) {
                data[key] = exportAttribute(attribute)
            }
        }

        return data
    }


    restore (data) {
        for (let key in data) {
            const attribute = this.attributes[key]

            if (attribute && attribute.exportable) {
                attribute.value = restoreAttribute(attribute, data[key])
            }
        }

        this.emit('restored')
    }

}



function exportAttribute (attribute) {
    const {value, type} = attribute
    const DataType = getDataType(type)

    if (DataType && DataType.export) {
        return DataType.export(value)
    }

    return value
}


function restoreAttribute (attribute, value) {
    const {type} = attribute
    const DataType = getDataType(type)

    if (DataType && DataType.restore) {
        return DataType.restore(value)
    }

    return value
}
