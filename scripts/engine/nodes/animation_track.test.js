import AnimationTrack from './animation_track'
import '../initializers/engine_initializer'
import jest from 'jest-mock'


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
            }, {
                getter: () => actor.x,
                change: value => {
                    actor.x = value
                },
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
        const endedStepListener = jest.fn()

        track.on('reached:step', endedStepListener)

        track.play()
        expect(track.currentStepIndex).toBe(0)

        track.update(0.5)
        expect(track.currentStepIndex).toBe(0)
        expect(track.progress).toBe(0.25)
        expect(actor.x).toBe(0.5)

        track.update(0.5)
        expect(actor.x).toBe(1)
        expect(track.progress).toBe(0.5)
        expect(track.currentStepIndex).toBe(1)
        expect(endedStepListener).toHaveBeenCalledTimes(1)

        track.update(0.5)
        expect(track.progress).toBe(0.75)
        expect(actor.x).toBe(0.5)

        track.update(0.5)
        expect(actor.x).toBe(0)
        expect(endedStepListener).toHaveBeenCalledTimes(2)
        expect(track.playing).toBe(false)

        track.play()
        expect(actor.x).toBe(0)
        expect(track.elapsedTime).toBe(0)
        expect(track.playing).toBe(true)
        expect(track.progress).toBe(0)
        expect(track.currentStepIndex).toBe(0)

        // FIXME I think this should be the right behavior
        // track.update(1.5)
        // expect(track.progress).toBe(0.75)
        // expect(track.currentStepIndex).toBe(1)
        // expect(actor.x).toBe(0.5)
    })


    test('stop', () => {
        track.play()
        track.stop()
        expect(track.playing).toBe(false)
        expect(actor.x).toBe(1)
    })

})
