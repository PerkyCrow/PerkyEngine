import httpLoader from './http_loader'


export default {
    type: 'text',
    extensions: ['txt'],
    load (path, options = {}) {
        return httpLoader.load(path, options).text()
    }
}
