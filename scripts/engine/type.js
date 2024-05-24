import Registry from './registry'


export default class Type {

    static registry = new Registry()

    static isTypeClass = true

    static register (...types) {
        this.registry.addClass(...types)
    }

    static getType (name) {
        return this.registry.get(name)
    }

}
