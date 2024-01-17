import httpLoader from './http_loader'


export default {
    type: 'json',
    extensions: ['json'],
    load (path, options = {}) {
        return httpLoader.load(path, options).json()
    }
}
