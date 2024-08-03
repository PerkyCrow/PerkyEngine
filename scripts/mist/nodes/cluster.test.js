import Cluster from './cluster'
import '../initialize'


describe(Cluster, () => {


    let cluster
    let world = {emit: () => {}}

    beforeEach(() => {
        cluster = new Cluster({reagents: ['A', 'B']})
        cluster.setReady(world)
    })


    test('reagents', () => {
        expect(cluster.reagents.length).toEqual(2)
        expect(cluster.reagents[0].assetName).toEqual('A')
        expect(cluster.reagents[1].assetName).toEqual('B')
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(2, 0)',
            '(3, 0)'
        ])
    })


    test('move', () => {
        cluster.move({x: 1, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(3, 0)',
            '(4, 0)'
        ])

        cluster.move({x: 1, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(4, 0)',
            '(5, 0)'
        ])

        cluster.move({x: 1, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(4, 0)',
            '(5, 0)'
        ])

        cluster.move({x: -1, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(3, 0)',
            '(4, 0)'
        ])

        cluster.move({x: -2, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(1, 0)',
            '(2, 0)'
        ])

        cluster.move({x: -2, y: 0})
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(0, 0)',
            '(1, 0)'
        ])
    })


    test('moveLeft', () => {
        cluster.moveLeft()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(1, 0)',
            '(2, 0)'
        ])
    })


    test('moveRight', () => {
        cluster.moveRight()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(3, 0)',
            '(4, 0)'
        ])
    })


    test('rotate', () => {
        cluster.rotate()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(2, 1)',
            '(2, 0)'
        ])

        cluster.rotate()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(3, 0)',
            '(2, 0)'
        ])

        cluster.rotate()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(2, 0)',
            '(2, 1)'
        ])

        cluster.rotate()
        expect(cluster.reagents.map(reagent => reagent.gridPosition.toString())).toEqual([
            '(2, 0)',
            '(3, 0)'
        ])
    })


    test('horizontal', () => {
        expect(cluster.horizontal).toBeTruthy()

        cluster.rotate()
        expect(cluster.horizontal).toBeFalsy()

        cluster.rotate()
        expect(cluster.horizontal).toBeTruthy()

        cluster.rotate()
        expect(cluster.horizontal).toBeFalsy()
    })

})
