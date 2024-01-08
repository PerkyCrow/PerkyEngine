export default class Vector2 {

    constructor (x, y) {
        if (typeof x === 'object') {
            y = x.y
            x = x.x
        }

        this.x = x || 0
        this.y = (typeof y === 'undefined' ? x : y) || 0
    }

    export () {
        return {
            x: this.x,
            y: this.y
        }
    }

    static toVector2 (...args) {
        if (args[0] instanceof Vector2) {
            return args[0]
        }
        return new Vector2(...args)
    }

    static get down () {
        return new Vector2(0, -1)
    }

    static get left () {
        return new Vector2(-1, 0)
    }

    static get negativeInfinity () {
        return new Vector2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
    }

    static get one () {
        return new Vector2(1, 1)
    }

    static get positiveInfinity () {
        return new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
    }

    static get right () {
        return new Vector2(1, 0)
    }

    static get up () {
        return new Vector2(0, 1)
    }

    static get zero () {
        return new Vector2(0, 0)
    }

    get type () {
        return 'Vector2'
    }

    get magnitude () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    get length () {
        return this.magnitude
    }

    get normalized () {
        return this.divide(this.magnitude)
    }

    get sqrMagnitude () {
        return this.x * this.x + this.y * this.y
    }

    get [Symbol.toStringTag] () {
        return this.toString()
    }

    *[Symbol.iterator] () {
        yield this.x
        yield this.y
    }

    get [0] () {
        return this.x
    }

    get [1] () {
        return this.y
    }

    set [0] (value) {
        this.x = value
    }

    set [1] (value) {
        this.y = value
    }

    equals (other) {
        return this.x === other.x && this.y === other.y
    }

    normalize () {
        return this.divide(this.magnitude)
    }

    set (x, y) {
        this.x = x
        this.y = y
    }

    toString () {
        return `(${this.x}, ${this.y})`
    }

    angle (other) {
        return Math.acos(this.dot(other) / (this.magnitude * other.magnitude))
    }

    add (other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    clampMagnitude (maxLength) {
        return this.divide(this.magnitude).multiplyScalar(maxLength)
    }

    sqrDistance (other) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        return dx * dx + dy * dy
    }

    distance (other) {
        return Math.sqrt(this.sqrDistance(other))
    }

    divide (scalar) {
        return new Vector2(this.x / scalar, this.y / scalar)
    }

    dot (other) {
        return this.x * other.x + this.y * other.y
    }

    lerp (other, t) {
        return new Vector2(
            this.x + (other.x - this.x) * t,
            this.y + (other.y - this.y) * t
        )
    }

    lerpUnclamped (other, t) {
        return new Vector2(
            this.x + (other.x - this.x) * t,
            this.y + (other.y - this.y) * t
        )
    }

    max (other) {
        return new Vector2(
            Math.max(this.x, other.x),
            Math.max(this.y, other.y)
        )
    }

    min (other) {
        return new Vector2(
            Math.min(this.x, other.x),
            Math.min(this.y, other.y)
        )
    }

    moveTowards (target, maxDistanceDelta) {
        const vector = target.subtract(this)
        const magnitude = vector.magnitude
        if (magnitude <= maxDistanceDelta || magnitude === 0) {
            return target
        }
        return this.add(vector.divide(magnitude).multiply(maxDistanceDelta))
    }

    multiply (ratio) {
        ratio = Vector2.toVector2(ratio)
        return new Vector2(this.x * ratio.x, this.y * ratio.y)
    }

    negate () {
        return new Vector2(-this.x, -this.y)
    }

    perpendicular () {
        return new Vector2(-this.y, this.x)
    }

    reflect (normal) {
        return this.subtract(normal.multiply(this.dot(normal) * 2))
    }

    scale (scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    subtract (other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    signedAngle (other) {
        return Math.acos(this.dot(other) / (this.magnitude * other.magnitude))
    }

    multiplyScalar (scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

}
