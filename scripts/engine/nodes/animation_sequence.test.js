import AnimationSequence from './animation_sequence'
import '../initializers/engine_initializer'


describe(AnimationSequence, () => {

    let sequence
    let actor
    let world = {emit: () => {}}

    beforeEach(() => {
        actor = {x: 0, y: 0}

        sequence = new AnimationSequence({
            tracks: [{
                steps: [{
                    getter: () => actor.x,
                    change: value => {
                        actor.x = value
                    },
                    duration: 1,
                    easing: 'linear',
                    target: 1
                },
                {
                    getter: () => actor.x,
                    change: value => {
                        actor.x = value
                    },
                    duration: 0.5,
                    easing: 'linear',
                    target: 0
                }]
            }, {
                steps: [{
                    getter: () => actor.y,
                    change: value => {
                        actor.y = value
                    },
                    duration: 2,
                    easing: 'linear',
                    target: 1
                }]
            }]
        })

        sequence.setReady(world)
    })


    test('isAnimation', () => {
        expect(sequence.isAnimation).toBe(true)
    })


    test('play', () => {
        sequence.play()
        expect(sequence.playing).toBe(true)
    })


    test('update', () => {
        sequence.play()
        sequence.update(0.5)

        expect(sequence.elapsedTime).toBe(0.5)
        expect(sequence.tracks[0].elapsedTime).toBe(0.5)
        expect(sequence.tracks[0].steps[0].elapsedTime).toBe(0.5)

        expect(actor.x).toBe(0.5)
        expect(actor.y).toBe(0.25)

        sequence.update(1.5)
        expect(actor.x).toBe(1)
        expect(actor.y).toBe(1)

        expect(sequence.elapsedTime).toBe(2)
        expect(sequence.playing).toBe(false)
        expect(sequence.overflow).toBe(0)
        expect(sequence.tracks[0].playing).toBe(false)
        expect(sequence.tracks[0].elapsedTime).toBe(2)
        expect(sequence.tracks[0].steps[0].playing).toBe(false)
    })


    test('stop', () => {
        sequence.play()
        sequence.stop()
        expect(sequence.playing).toBe(false)
        expect(actor.x).toBe(1)
        expect(actor.y).toBe(1)
    })

})
