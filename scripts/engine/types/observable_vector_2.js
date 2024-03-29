import Vector2 from './vector_2'

export default class ObservableVector2 extends Vector2 {

    constructor (x, y, onChange) {
        super()

        if (typeof x === 'object') {
            onChange = y
            y = x.y
            x = x.x
        }

        x = x || 0
        y = (typeof y === 'undefined' ? x : y) || 0

        this.onChange = onChange
        this.type = 'ObservableVector2'

        Object.defineProperty(this, 'x', {
            enumerable: true,
            get: () => x,
            set: (value) => {
                const oldX = x
                x = value
                if (this.onChange && oldX !== x) {
                    this.onChange(this, new Vector2(oldX, y))
                }
            }
        })

        Object.defineProperty(this, 'y', {
            enumerable: true,
            get: () => y,
            set: (value) => {
                const oldY = y
                y = value
                if (this.onChange && oldY !== y) {
                    this.onChange(this, new Vector2(x, oldY))
                }
            }
        })
    }


    set (x, y) {
        if (typeof x === 'object') {
            y = x.y
            x = x.x
        } else if (typeof y === 'undefined') {
            y = x
        }

        this.x = x
        this.y = y
    }


    static cast (value, {onChange} = {}) {
        if (!ObservableVector2.is(value)) {
            value = new ObservableVector2(Vector2.cast(value))
        }

        if (value.onChange !== onChange) {
            value.onChange = onChange
        }

        return value
    }


    static free (value) {
        delete value.onChange
    }
    

    static is (value) {
        return value instanceof ObservableVector2
    }
    
    
    static serialize (value) {
        return value.serialize()
    }


    static toObservableVector2 (...args) {
        if (args[0] instanceof ObservableVector2) {
            return args[0]
        }
        return new ObservableVector2(...args)
    }

}
