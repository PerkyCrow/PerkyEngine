
export default class Registry extends Map {

    addClass (...Items) {
        Items.forEach((Item) => {
            this.set(Item.name, Item)
        })
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

}
