import Vector2 from '../vector_2'
const {toVector2} = Vector2

export default function use2d (object, {
    position = Vector2.zero,
    rotation = 0,
    scale    = Vector2.one
} = {}) {

    if (object.is2d) {
        return
    }

    Object.assign(object, {
        is2d: true,
        position: toVector2(position),
        rotation,
        scale: toVector2(scale),

        translate (offset) {
            this.position = this.position.add(offset)
        },

        rotate (angle) {
            this.rotation += angle
        },

        applyScale (ratio) {
            ratio = toVector2(ratio)
            this.scale = this.scale.multiply(ratio)
        },

        getAngleTo (target) {
            target = toVector2(target)
            return Math.atan2(target.y - this.position.y, target.x - this.position.x)
        },

        getDistanceTo (target) {
            target = toVector2(target)
            return target.subtract(this.position).magnitude
        },

        getDirectionTo (target) {
            target = toVector2(target)
            return target.subtract(this.position).normalize()
        },

        lookAt (target) {
            target = toVector2(target)
            this.rotation = this.getAngleTo(target)
        }
    })

}
