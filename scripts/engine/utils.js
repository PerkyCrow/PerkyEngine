export function getUrlExt (url) {
    let withoutArgs = url.split('?').shift()
    return withoutArgs.split('.').pop().toLowerCase()
}