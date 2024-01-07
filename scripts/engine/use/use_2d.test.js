import use2d from './use_2d'

describe('use2d', () => {

    let object

    beforeEach(() => {
        object = {}
    })


    test('position', () => {
        use2d(object, {position: {x: 1, y: 2}})
        expect(object.position.x).toEqual(1)
        expect(object.position.y).toEqual(2)
    })


    test('rotation', () => {
        use2d(object, {rotation: 1})
        expect(object.rotation).toEqual(1)
    })


    test('scale', () => {
        use2d(object, {scale: {x: 1, y: 2}})
        expect(object.scale.x).toEqual(1)
        expect(object.scale.y).toEqual(2)
    })


    test('translate', () => {
        use2d(object, {position: {x: 1, y: 2}})
        object.translate({x: 3, y: 4})
        expect(object.position.x).toEqual(4)
        expect(object.position.y).toEqual(6)
    })


    test('rotate', () => {
        use2d(object, {rotation: 1})
        object.rotate(2)
        expect(object.rotation).toEqual(3)
    })


    test('applyScale', () => {
        use2d(object, {scale: {x: 1, y: 2}})
        object.applyScale({x: 3, y: 4})
        expect(object.scale.x).toEqual(3)
        expect(object.scale.y).toEqual(8)
    })


    test('getAngleTo', () => {
        use2d(object, {position: {x: 0, y: 0}})
        expect(object.getAngleTo({x: 1, y: 1})).toEqual(Math.PI / 4)
    })


    test('getDistanceTo', () => {
        use2d(object, {position: {x: 0, y: 0}})
        expect(object.getDistanceTo({x: 1, y: 0})).toEqual(1)
    })


    test('getDirectionTo', () => {
        use2d(object, {position: {x: 0, y: 0}})
        expect(object.getDirectionTo({x: 0, y: 1}).toString()).toEqual('(0, 1)')
    })


    test('lookAt', () => {
        use2d(object, {position: {x: 0, y: 0}})
        object.lookAt({x: 0, y: 1})
        expect(object.rotation).toEqual(Math.PI / 2)
    })


    test('is2d', () => {
        use2d(object)
        expect(object.is2d).toEqual(true)
    })


    test('use2d', () => {
        use2d(object)
        expect(object.is2d).toEqual(true)
    })

})