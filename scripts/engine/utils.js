
export function getUrlExt (url) {
    let withoutArgs = url.split('?').shift()
    return withoutArgs.split('.').pop().toLowerCase()
}


export function filterKeys (object, keys = []) {
    let filtered = {}

    for (let key of keys) {
        if (key in object) {
            filtered[key] = object[key]
        }
    }

    return filtered
}


export function interpolate (start, end, ratio) {
    return start + (end - start) * ratio
}


export const lerp = interpolate


export function clamp (value, min, max) {
    return Math.max(min, Math.min(max, value))
}


export function normalize (value, min, max) {
    return (value - min) / (max - min)
}


export function remap (value, sourceMin, sourceMax, destMin, destMax) { // eslint-disable-line max-params
    return destMin + ((destMax - destMin) * (value - sourceMin) / (sourceMax - sourceMin))
}


export function smoothstep (edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)
}


export function easeIn (t) {
    return t * t
}


export function easeOut (t) {
    return t * (2 - t)
}


export function easeInOut (t) {
    return t * t * (3 - 2 * t)
}


export function randomBetween (min, max) {
    return min + Math.random() * (max - min)
}


export function randomIntBetween (min, max) {
    return Math.floor(randomBetween(min, max))
}


export function randomPick (array) {
    return array[randomIntBetween(0, array.length)]
}
