export default class Engine {

    constructor ({world, view}) {
        this.world = null
        this.view  = null
    }


}


function attach (engine, {world, view} = {}) {
    engine.world = world

    if (view) {
        engine.view = view
    }
}