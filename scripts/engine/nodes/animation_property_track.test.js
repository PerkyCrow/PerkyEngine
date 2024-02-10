import AnimationPropertyTrack from './animation_property_track'
import '../initializers/engine_initializer'


describe(AnimationPropertyTrack, () => {

    let actor
    let track
    let world = {emit: () => {}}

    beforeEach(() => {
        actor = {x: 0, y: 0}

        track = new AnimationPropertyTrack({
            label: 'track',
            getter: () => actor.x,
            change: value => {
                actor.x = value
            },
            steps: [{
                duration: 1,
                easing: 'linear',
                target: 1
            }, {
                duration: 1,
                easing: 'linear',
                target: 0
            }]
        })

        track.setReady(world)
    })


    test('isAnimation', () => {
        expect(track.isAnimation).toBe(true)
    })


    test('play', () => {
        track.play()
        expect(track.playing).toBe(true)
    })


    test('update', () => {
        track.play()
        track.update(0.5)
        expect(actor.x).toBe(0.5)

        track.update(0.5)
        expect(actor.x).toBe(1)

        track.update(0.5)
        expect(actor.x).toBe(0.5)
    })

})