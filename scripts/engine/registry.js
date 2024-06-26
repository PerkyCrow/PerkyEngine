
export default class Registry extends Map {

    addClass (...Items) {
        Items.forEach((Item) => {
            this.set(Item.name, Item)
        })
    }


    addCollection (collection) {
        for (let key in collection) {
            this.set(key, collection[key])
        }
    }


    instantiate (name, ...args) {
        const Item = this.get(name)

        if (typeof Item === 'function') {
            return new Item(...args)
        }

        return null
    }


    call (name, methodName, ...args) {
        const item = this.get(name)

        if (item && typeof item[methodName] === 'function') {
            return item[methodName](...args)
        }

        return null
    }


    read (name, propertyName) {
        const item = this.get(name)

        if (item instanceof Object) {
            return item[propertyName]
        }

        return null
    }


    toObject () {
        const object = {}

        this.forEach((value, key) => {
            object[key] = value
        })

        return object
    }

}
