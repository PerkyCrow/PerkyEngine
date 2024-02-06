import SmoothAnimation from './smooth_animation'


describe(SmoothAnimation, () => {

    let actor
    let animation

    beforeEach(() => {
        actor = {x: 0, y: 0}

        animation = new SmoothAnimation({
            actor,
            duration: 1,
            easing: 'linear',
            targetKey: 'x',
            targetValue: 1
        })
    })


    test('isAnimation', () => {
        expect(animation.isAnimation).toBe(true)
    })


    test('play', () => {
        animation.play()
        expect(animation.playing).toBe(true)
    })


    test('update', () => {
        animation.play()
        animation.update(0.5)
        expect(actor.x).toBe(0.5)
    })


    test('stop', () => {
        animation.play()
        animation.stop()
        expect(animation.playing).toBe(false)
        expect(actor.x).toBe(1)
    })

})
