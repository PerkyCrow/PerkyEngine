import Cluster from './cluster'


function expectCoords (reagent, x, y) {
    expect(reagent.x).toEqual(x)
    expect(reagent.y).toEqual(y)
}


describe(Cluster, () => {

    let reagentA
    let reagentB
    let reagents

    beforeEach(() => {
        reagentA = {name: 'A', x: 0, y: 0}
        reagentB = {name: 'B', x: 0, y: 0}
        reagents = [reagentA, reagentB]
    })



    test('rotate', () => {
        {
            const cluster = new Cluster({reagents: reagents})
            expectCoords(reagentA, 2, 0)
            expectCoords(reagentB, 3, 0)

            cluster.rotate()
            expectCoords(reagentA, 2, 1)
            expectCoords(reagentB, 2, 0)

            cluster.rotate()
            expectCoords(reagentA, 3, 0)
            expectCoords(reagentB, 2, 0)

            cluster.rotate()
            expectCoords(reagentA, 2, 0)
            expectCoords(reagentB, 2, 1)

            cluster.rotate()
            expectCoords(reagentA, 2, 0)
            expectCoords(reagentB, 3, 0)

        }

        {
            const cluster = new Cluster({reagents: [reagentA]})
            expectCoords(reagentA, 2, 0)

            cluster.rotate()
            expectCoords(reagentA, 2, 0)
        }
    })


    test('horizontal', function () {
        const cluster = new Cluster({reagents: reagents})

        expect(cluster.horizontal).toBeTruthy()

        cluster.rotate()
        expect(cluster.horizontal).toBeFalsy()

        cluster.rotate()
        expect(cluster.horizontal).toBeTruthy()

        cluster.rotate()
        expect(cluster.horizontal).toBeFalsy()
    })


    test('x', function () {
        {
            const cluster = new Cluster({reagents: reagents})
            expect(cluster.x).toEqual(2)
        }
        {
            const cluster = new Cluster({reagents: [reagentA]})
            expect(cluster.x).toEqual(2)
        }
    })


    test('move', () => {
        const cluster = new Cluster({reagents: reagents})

        cluster.move({x: -1})
        expect(cluster.x).toEqual(1)

        cluster.move({x: -1})
        expect(cluster.x).toEqual(0)

        cluster.move({x: -1})
        expect(cluster.x).toEqual(0)

        cluster.move({x: 1})
        expect(cluster.x).toEqual(1)

        cluster.move({x: 7})
        expect(cluster.x).toEqual(4)

        cluster.rotate()
        expect(cluster.x).toEqual(4)

        cluster.move({x: 1})
        expect(cluster.x).toEqual(5)

        cluster.rotate()
        expect(cluster.x).toEqual(4)
    })


    test('export', () => {
        const cluster = new Cluster({reagents: reagents})
        cluster.move({x: -1})
        cluster.rotate()

        expect(cluster.export()).toEqual({
            reagents: [{name: 'A', x: 1, y: 1}, {name: 'B', x: 1, y: 0}],
            width: 6,
            height: 2,
            positionIndex: 1,
            x: 1,
            y: 0
        })
    })


    test('restore', () => {
        const cluster = new Cluster({reagents: reagents})

        const state = cluster.export()

        cluster.move({x: -1})
        cluster.rotate()

        cluster.restore(state)

        expect(cluster.export()).toEqual(state)
    })

})