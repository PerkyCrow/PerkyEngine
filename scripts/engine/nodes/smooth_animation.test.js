import SmoothAnimation from './smooth_animation'


describe(SmoothAnimation, () => {

    let actor
    let animation
    let world = {emit: () => {}}

    beforeEach(() => {
        actor = {x: 0, y: 0}
        animation = new SmoothAnimation({
            getter: () => actor.x,
            change: value => {
                actor.x = value
            },
            duration: 1,
            easing: 'linear',
            target: 1
        })
        animation.setReady(world)
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
