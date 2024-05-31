import Rectangle from 'engine/nodes/rectangle'
import ObservableVector2 from 'engine/observable_vector_2'

const positionsMap = [
    [{x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 0, y: 0}],
    [{x: 1, y: 0}, {x: 0, y: 0}],
    [{x: 0, y: 0}, {x: 0, y: 1}]
]


export default class Cluster extends Rectangle {

    constructor (params = {}) {
        super(params)

        // cluster.x             = typeof x === 'undefined' ? Math.floor(width * 0.5 - cluster.reagents.length * 0.5) : x
        // cluster.y             = y || 0

        this.setAttribute('gridPosition', {
            serializable: true,
            watch: true,
            defaultValue: new ObservableVector2(this.position),
            options: {
                onChange: this.emitter('changed:gridPosition')
            }
        })

        spawnReagents(this, params.reagents)
    }


    rotate () {
        if (this.reagents.length > 1) {
            this.positionIndex += 1
            this.positionIndex %= positionsMap.length
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


    get reagents () {
        return this.findChildren(child => child.isReagent)
    }


    forBoard (board) {
        const {reagents} = this

        const height = board.height - this.height

        return reagents.sort(sortY).map(reagent => {
            return {
                name: reagent.name,
                x:    reagent.gridPosition.x,
                y:    height + reagent.gridPosition.y
            }
        })
    }


    clear () {
        this.reagents.length = 0
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

function reset (cluster, {
    reagents      = [],
    width         = 6,
    height        = 2,
    positionIndex = 0,
    x,
    y = 0
} = {}) {
    cluster.reagents      = reagents.slice(0, 2)
    cluster.width         = width
    cluster.height        = height
    cluster.positionIndex = positionIndex
    cluster.x             = typeof x === 'undefined' ? Math.floor(width * 0.5 - cluster.reagents.length * 0.5) : x
    cluster.y             = y || 0
    syncReagents(cluster)
}


function updatePosition (cluster, x) {

    const {width, horizontal, reagents} = cluster
    let maxX = (horizontal ? width : width + 1) - reagents.length

    cluster.x = Math.min(Math.max(x, 0), maxX)

    syncReagents(cluster)
}


function syncReagents (cluster) {
    const {reagents, positionIndex} = cluster
    const positions = positionsMap[positionIndex]

    reagents.forEach((reagent, index) => {
        const position = positions[index]

        reagent.gridPosition.x = cluster.gridPosition.x + position.gridPosition.x
        reagent.gridPosition.y = cluster.gridPosition.y + position.gridPosition.y
    })
}

function sortY (a, b) {
    return a.y - b.y
}