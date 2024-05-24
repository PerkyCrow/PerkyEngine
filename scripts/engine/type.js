import Registry from './registry'


export default class Type {

    static registry = new Registry()

    static register (...types) {
        this.registry.addClass(...types)
    }

    static get (name) {
        return this.registry.get(name)
    }

}
