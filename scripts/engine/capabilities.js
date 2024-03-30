import Registry from './registry'


export const registry = new Registry()

export function addCapability (capabilities) {
    for (let key in capabilities) {
        registry.set(key, capabilities[key])
    }
}

export function getCapability (name) {
    return registry.get(name)
}
