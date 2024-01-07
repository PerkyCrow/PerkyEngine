import Notifier from './notifier'
import Vector2 from './vector_2'



export default class Model extends Notifier {


    // TODO array, object with smart traversal export
    static types = {
        vector2: {
            export:  vector => vector.export(),
            restore: data   => Vector2.toVector2(data)
        },
        object: {
            export: object => {
                if (object.export) {
                    return object.export()
                }

                // TODO smart copy detecting vectors and other stuff
                return Object.assign({}, object)
            }
        }
    }


    static setType (type, accessor) {
        this.types[type] = accessor
    }


    static exportAttribute (attribute) {
        const {value, type} = attribute
        const accessor = this.types[type]

        if (accessor && accessor.export) {
            return accessor.export(value)
        }

        return value
    }


    static restoreAttribute (attribute) {
        const {value, type} = attribute
        const accessor = this.types[type]

        if (accessor && accessor.restore) {
            return accessor.restore(value)
        }

        return value
    }


    constructor () {
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
        type       = typeof value
    } = {}) {
        if (typeof key === 'string') {
            const attribute = {type, exposable, exportable, watch, accessor, defaultValue}
            this.attributes[key] = attribute

            Object.defineProperty(attribute, 'value', {
                enumerable: true,
                get: () => value,
                set:  v => {
                    if (attribute.watch) {
                        this.emit(`changed:${key}`, v, value)
                    }

                    return v
                }
            })

            if (accessor) {
                Object.defineProperty(this, key, {
                    enumerable: true,
                    get: () => value,
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
            const {value, watch} = attribute

            if (watch) {
                this.emit(`changed:${key}`, newValue, value)
            }
        }

        return newValue
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
                data[key] = Model.exportAttribute(attribute.value, attribute.type)
            }
        }

        return data
    }


    restore (data) {
        for (let key in data) {
            const attribute = this.attributes[key]

            if (attribute && attribute.exportable) {
                this.attributes[key] = Model.restoreAttribute(data[key], attribute.type)
            }
        }

        this.emit('restored')
    }

}
