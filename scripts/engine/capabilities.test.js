import {
    getCapability,
    addCapability
} from './capabilities'


describe('capabilities', () => {

    test('integration', () => {
        function draggable () {}

        addCapability({
            draggable
        })

        expect(getCapability('draggable')).toBe(draggable)
    })

})
