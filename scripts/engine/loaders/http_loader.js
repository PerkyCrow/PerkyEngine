
export default {
    type: 'http',
    extensions: [],
    load (path, options = {}) {
        return fetch(path, options)
    }
}
