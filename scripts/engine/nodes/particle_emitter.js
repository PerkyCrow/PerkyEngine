import Node2D from './node_2d'


export default class ParticleEmitter extends Node2D {


    constructor (params = {}) {
        super(params)

        this.timer = this.create('Timer', {
            autoStart: true,
            duration: 0.1,
            repeat: Infinity
        })

        this.timer.on('reached', () => this.emitParticle())
        this.on('ready', () => this.start())
    }


    start () {
        this.timer.start()
    }


    emitParticle () {
        const particle = this.create('Particle', {

        })
    }

}
