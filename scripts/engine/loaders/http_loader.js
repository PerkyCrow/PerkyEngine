
export const type = 'http'

export const extensions = []


export function load (path, options = {}) {
    return fetch(path, options)
}
