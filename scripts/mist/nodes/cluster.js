import Rectangle from 'engine/nodes/rectangle'
import ObservableVector2 from 'engine/observable_vector_2'


const rotationsMap = [
    [{x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 0, y: 0}],
    [{x: 1, y: 0}, {x: 0, y: 0}],
    [{x: 0, y: 0}, {x: 0, y: 1}]
]


export default class Cluster extends Rectangle {

    constructor (params = {}) {

        super(params)

        this.setAttribute('width', {
            defaultValue: 6
        })

        this.setAttribute('height', {
            defaultValue: 6
        })

        this.setAttribute('gridPosition', {
            serializable: true,
            watch: true,
            defaultValue: new ObservableVector2(this.position),
            options: {
                onChange: this.emitter('changed:gridPosition')
            }
        })


        this.setAttribute('rotationsIndex', {
            serializable: true,
            watch: true,
            defaultValue: 0,
            options: {
                onChange: this.emitter('changed:rotationsIndex')
            }
        })

        spawnReagents(this, params.reagents)

        this.gridPosition.x = typeof params.x === 'undefined' ? Math.floor(this.width * 0.5 - this.reagents.length * 0.5) : params.x
        this.gridPosition.y = params.y || 0

        syncReagents(this)
    }


    get reagents () {
        return this.findChildren(child => child.isReagent)
    }


    rotate () {
        if (this.reagents.length > 1) {
            this.rotationsIndex += 1
            this.rotationsIndex %= rotationsMap.length
            syncReagents(this)

            updatePosition(this, this.gridPosition.x)
        }
    }


    move (step) {
        updatePosition(this, this.gridPosition.x + step.x)
    }


    moveLeft () {
        this.move({x: -1, y: 0})
    }


    moveRight () {
        this.move({x: 1, y: 0})
    }


    get horizontal () {
        const {reagents} = this
        const [first] = reagents

        return reagents.every(reagent => reagent.gridPosition.y === first.gridPosition.y)
    }

}


function spawnReagents (cluster, reagentNames) {
    if (Array.isArray(reagentNames) && reagentNames.length) {
        reagentNames = reagentNames.slice(0, 2)

        reagentNames.forEach(name => {
            cluster.create('Reagent', {assetName: name})
        })
    }
}


function updatePosition (cluster, x) {

    const {width, horizontal, reagents} = cluster
    let maxX = (horizontal ? width : width + 1) - reagents.length

    cluster.gridPosition.x = Math.min(Math.max(x, 0), maxX)

    syncReagents(cluster)
}


function syncReagents (cluster) {
    const {reagents, rotationsIndex} = cluster
    const positions = rotationsMap[rotationsIndex]

    reagents.forEach((reagent, index) => {
        const position = positions[index]

        reagent.gridPosition.x = cluster.gridPosition.x + position.x
        reagent.gridPosition.y = cluster.gridPosition.y + position.y
    })
}


function sortY (a, b) {
    return a.y - b.y
}
