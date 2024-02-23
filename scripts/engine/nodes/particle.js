import Physics2D from './physics_2d'


export default class Particle extends Physics2D {

    constructor (params = {}) {
        super(params)
        this.isParticle = true

        this.sprite = this.create('Sprite', params.sprite)
    }

}
