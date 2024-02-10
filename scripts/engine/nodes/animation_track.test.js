import AnimationTrack from './animation_track'
import '../initializers/engine_initializer'


describe(AnimationTrack, () => {

    let actor
    let track
    let world = {emit: () => {}}

    beforeEach(() => {
        actor = {x: 0, y: 0}

        track = new AnimationTrack({
            label: 'track',
            steps: [{
                getter: () => actor.x,
                change: value => {
                    actor.x = value
                },
                duration: 1,
                easing: 'linear',
                target: 1
            }]
        })

        track.setReady(world)

        // track.addStep({
        //     getter: () => actor.x,
        //     change: value => {
        //         actor.x = value
        //     },
        //     duration: 1,
        //     easing: 'linear',
        //     target: 1
        // })
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
    })


    test('stop', () => {
        track.play()
        track.stop()
        expect(track.playing).toBe(false)
        expect(actor.x).toBe(1)
    })

})
