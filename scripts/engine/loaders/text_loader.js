import httpLoader from './http_loader'


export const type = 'text'

export const extensions = ['txt']


export function load (path, options = {}) {
    return httpLoader.load(path, options).text()
}
