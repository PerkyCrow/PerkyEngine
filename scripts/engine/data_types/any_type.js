export default class AnyType {

    static name = 'Any'

    static serialize (value) {
        return value
    }

    static restore (value) {
        return value
    }

    static is () {
        return true
    }

}