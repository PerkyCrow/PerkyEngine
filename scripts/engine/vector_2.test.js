import Vector2 from './vector_2'


describe(Vector2, () => {

    test('constructor', () => {
        const vector = new Vector2(1, 2)
        expect(vector.x).toEqual(1)
        expect(vector.y).toEqual(2)

        const vector2 = new Vector2({x: 3, y: 4})
        expect(vector2.x).toEqual(3)
        expect(vector2.y).toEqual(4)

        const vector3 = new Vector2()
        expect(vector3.x).toEqual(0)
        expect(vector3.y).toEqual(0)

        const vector4 = new Vector2({x: 5})
        expect(vector4.x).toEqual(5)
        expect(vector4.y).toEqual(5)

        const vector5 = new Vector2(6)
        expect(vector5.x).toEqual(6)
        expect(vector5.y).toEqual(6)
    })


    test('toString', () => {
        const vector = new Vector2(1, 2)
        expect(vector.toString()).toEqual('(1, 2)')
    })


    test('down', () => {
        expect(Vector2.down.toString()).toEqual('(0, -1)')
    })


    test('left', () => {
        expect(Vector2.left.toString()).toEqual('(-1, 0)')
    })


    test('negativeInfinity', () => {
        expect(Vector2.negativeInfinity.toString()).toEqual('(-Infinity, -Infinity)')
    })


    test('one', () => {
        expect(Vector2.one.toString()).toEqual('(1, 1)')
    })


    test('positiveInfinity', () => {
        expect(Vector2.positiveInfinity.toString()).toEqual('(Infinity, Infinity)')
    })


    test('right', () => {
        expect(Vector2.right.toString()).toEqual('(1, 0)')
    })


    test('up', () => {
        expect(Vector2.up.toString()).toEqual('(0, 1)')
    })


    test('zero', () => {
        expect(Vector2.zero.toString()).toEqual('(0, 0)')
    })


    test('length', () => {
        const vector = new Vector2(3, 4)
        expect(vector.length).toEqual(5)
    })


    test('magnitude', () => {
        const vector = new Vector2(3, 4)
        expect(vector.magnitude).toEqual(5)
    })


    test('normalized', () => {
        const vector = new Vector2(3, 4)
        expect(vector.normalized.toString()).toEqual('(0.6, 0.8)')
    })


    test('sqrMagnitude', () => {
        const vector = new Vector2(3, 4)
        expect(vector.sqrMagnitude).toEqual(25)
    })


    test('Symbol.toStringTag', () => {
        const vector = new Vector2(1, 2)
        expect(vector[Symbol.toStringTag]).toEqual('(1, 2)')
    })


    test('Symbol.iterator', () => {
        const vector = new Vector2(1, 2)
        expect([...vector]).toEqual([1, 2])
    })


    test('getters', () => {
        const vector = new Vector2(1, 2)
        expect(vector[0]).toEqual(1)
        expect(vector[1]).toEqual(2)
    })


    test('setters', () => {
        const vector = new Vector2(1, 2)
        vector[0] = 3
        vector[1] = 4
        expect(vector.toString()).toEqual('(3, 4)')
    })


    test('add', () => {
        const vector = new Vector2(1, 2)
        expect(vector.add(new Vector2(3, 4)).toString()).toEqual('(4, 6)')
    })


    test('angle', () => {
        const vector = new Vector2(1, 0)
        const other = new Vector2(0, 1)
        expect(vector.angle(other)).toEqual(Math.PI / 2)
    })


    test('clampMagnitude', () => {
        const vector = new Vector2(3, 4)
        expect(vector.clampMagnitude(2).toString()).toEqual('(1.2, 1.6)')
    })


    test('sqrDistance', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(4, 6)
        expect(vector.sqrDistance(other)).toEqual(25)
    })


    test('distance', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(4, 6)
        expect(vector.distance(other)).toEqual(5)
    })


    test('dot', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(3, 4)
        expect(vector.dot(other)).toEqual(11)
    })


    test('divide', () => {
        const vector = new Vector2(1, 2)
        expect(vector.divide(2).toString()).toEqual('(0.5, 1)')
    })


    test('lerp', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(3, 4)
        expect(vector.lerp(other, 0.5).toString()).toEqual('(2, 3)')
    })


    test('lerpUnclamped', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(3, 4)
        expect(vector.lerpUnclamped(other, 2).toString()).toEqual('(5, 6)')
    })


    test('max', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(3, 4)
        expect(vector.max(other).toString()).toEqual('(3, 4)')
    })


    test('min', () => {
        const vector = new Vector2(1, 2)
        const other = new Vector2(3, 4)
        expect(vector.min(other).toString()).toEqual('(1, 2)')
    })


    test('multiply', () => {
        const vector = new Vector2(1, 2)
        expect(vector.multiply(2).toString()).toEqual('(2, 4)')
    })


    test('moveTowards', () => {
        const vector = new Vector2(0, 1)
        const other = new Vector2(0, 2)
        expect(vector.moveTowards(other, 0.5).toString()).toEqual('(0, 1.5)')
    })


    test('negate', () => {
        const vector = new Vector2(1, 2)
        expect(vector.negate().toString()).toEqual('(-1, -2)')
    })


    test('perpendicular', () => {
        const vector = new Vector2(3, 4)
        expect(vector.perpendicular().toString()).toEqual('(-4, 3)')
    })


    test('reflect', () => {
        const vector = new Vector2(1, 2)
        const normal = new Vector2(0, 1)
        expect(vector.reflect(normal).toString()).toEqual('(1, -2)')
    })

    test('scale', () => {
        const vector = new Vector2(1, 2)
        expect(vector.scale(2).toString()).toEqual('(2, 4)')
    })


    test('subtract', () => {
        const vector = new Vector2(1, 2)
        expect(vector.subtract(new Vector2(3, 4)).toString()).toEqual('(-2, -2)')
    })


    test('signedAngle', () => {
        const vector = new Vector2(1, 0)
        const other = new Vector2(0, 1)
        expect(vector.signedAngle(other)).toEqual(Math.PI / 2)
    })


    test('multiplyScalar', () => {
        const vector = new Vector2(1, 2)
        expect(vector.multiplyScalar(2).toString()).toEqual('(2, 4)')
    })


})
