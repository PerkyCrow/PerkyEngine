import Notifier from './notifier'
import TypeRegistry from './type'
import {filterKeys} from './utils'


const attributeParamKeys = [
    'exposable',
    'serializable',
    'watch',
    'accessor',
    'defaultValue',
    'value',
    'type',
    'options'
]


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


    // eslint-disable-next-line complexity
    setAttribute (key, {
        exposable  = true,
        serializable = false,
        watch      = false,
        accessor   = true,
        defaultValue,
        value      = typeof defaultValue === 'function' ? defaultValue() : defaultValue,
        type       = (typeof value === 'object' && value.type) || typeof value,
        options    = {}
    } = {}) {

        const attribute = {type, exposable, serializable, watch, accessor, defaultValue, options}
        this.attributes[key] = attribute

        const Type = TypeRegistry.get(type)
        const cast = Type && Type.cast
        const free = Type && Type.free

        Object.defineProperty(attribute, 'value', {
            enumerable: true,
            get: () => value,
            set:  v => {
                let oldValue = value

                if (oldValue !== v) {
                    value = cast ? cast(v, options) : v

                    if (free) {
                        free(oldValue)
                    }
                }

                if (attribute.watch && oldValue !== value) {
                    this.emit(`changed:${key}`, value, oldValue)
                }

                return v
            }
        })

        if (accessor) {
            setAccessor(this, key, attribute)
        }

        if (cast) {
            value = cast(value, options)
        }

        this.emit('attribute:set', key, attribute)
    }


    updateAttribute (key, params = {}) {
        let attribute = this.getAttribute(key)
        let wasAccessor = false

        if (attribute) {
            wasAccessor = attribute.accessor
            const filteredParams = filterKeys(params, attributeParamKeys)
            const updatedParams = Object.assign({}, attribute, filteredParams)
            params = updatedParams
        }


        this.setAttribute(key, params)

        if (wasAccessor && !params.accessor && this[key] === attribute.value) {
            removeAccessor(this, key, attribute)
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
    const Type = TypeRegistry.get(type)

    if (Type && Type.serialize) {
        return Type.serialize(value, attribute.options)
    }

    return value
}



function setAccessor (model, key, attribute) {
    attribute.accessor = true
    Object.defineProperty(model, key, {
        configurable: true,
        enumerable: true,
        get: () => attribute.value,
        set:  v => {
            attribute.value = v
        }
    })
}



function removeAccessor (model, key, attribute) {
    attribute.accessor = false
    delete model[key]
}
