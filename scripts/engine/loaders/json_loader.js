import httpLoader from './http_loader'


export const type = 'json'

export const extensions = ['json']


export function load (path, options = {}) {
    return httpLoader.load(path, options).json()
}
