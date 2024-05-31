import Node2D from './node_2d'
import ObservableVector2 from '../observable_vector_2'

export default class Physics2D extends Node2D {

    constructor (params = {}) {
        super(params)
        this.isPhysics2D = true

        this.setAttribute('velocity', {
            serializable: true,
            watch: true,
            type: 'ObservableVector2',
            defaultValue: new ObservableVector2(0, 0),
            value: params.velocity,
            options: {
                onChange: this.emitter('changed:velocity')
            }
        })

        this.setAttribute('acceleration', {
            serializable: true,
            watch: true,
            type: 'ObservableVector2',
            defaultValue: new ObservableVector2(0, 0),
            value: params.acceleration,
            options: {
                onChange: this.emitter('changed:acceleration')
            }
        })

        this.setAttribute('angularVelocity', {
            serializable: true,
            watch: true,
            defaultValue: 0,
            value: params.angularVelocity,
            options: {
                onChange: this.emitter('changed:angularVelocity')
            }
        })

    }


    update (deltaTime, elapsedTime) {
        if (super.update(deltaTime, elapsedTime)) {
            if (!this.acceleration.isNull()) {
                this.velocity = this.velocity.add(this.acceleration.scale(deltaTime))
            }
    
            if (!this.velocity.isNull()) {
                this.position = this.position.add(this.velocity.scale(deltaTime))
            }

            if (this.angularVelocity) {
                this.rotation += this.angularVelocity * deltaTime
            }

            return true
        }

        return false
    }

}