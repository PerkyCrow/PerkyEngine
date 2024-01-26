
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
