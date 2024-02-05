import Animation from './animation'


describe(Animation, () => {

    let parent
    let animation

    beforeEach(() => {
        parent    = {rate: 1}
        animation = new Animation({parent})
    })


    test('rate', () => {
        expect(animation.rate).toEqual(1)
        parent.rate = 2
        expect(animation.rate).toEqual(2)
        animation.rate = 2
        expect(animation.rate).toEqual(4)
    })


    test('duration', () => {
        expect(animation.duration).toEqual(1)
        animation.rate = 2
        expect(animation.duration).toEqual(0.5)
    })


    test('play', async () => {
        setTimeout(() => animation.tick(1))
        await animation.play()
        expect(animation.playing).toEqual(false)
    })


    test('tick', () => {
        animation.play()
        animation.tick(0.1)
        expect(animation.elapsedTime).toEqual(0.1)
        expect(animation.playing).toBeTruthy()
        animation.tick(0.9)
        expect(animation.elapsedTime).toEqual(1)
        expect(animation.playing).toBeFalsy()
    })


    test('stop', () => {
        animation.play()
        expect(animation.playing).toBeTruthy()
        animation.stop()
        expect(animation.playing).toBeFalsy()
    })


    test('start', () => {
        animation.start = function (params) {
            animation.hello = params.hello
        }
        animation.play({hello: 'world'})
        expect(animation.hello).toEqual('world')
    })


    test('update', () => {
        animation.update = function (deltaTime) {
            animation.lastDeltaTime = deltaTime
        }
        animation.play()
        animation.tick(0.5)
        expect(animation.lastDeltaTime).toEqual(0.5)
    })


    test('progress', () => {
        animation.update = function (deltaTime) {
            animation.lastDeltaTime = deltaTime
        }
        animation.play({rate: 0.5})
        animation.tick(0.5)
        expect(animation.progress).toEqual(0.25)

        animation.progress = 1
        expect(animation.elapsedTime).toEqual(2)
    })


    test('end', () => {
        animation.end = function () {
            animation.ended = true
        }
        animation.play()
        animation.tick(1)
        expect(animation.ended).toBeTruthy()
    })


    test('overflow', () => {
        expect(animation.overflow).toEqual(-1)
        animation.elapsedTime = 1
        expect(animation.overflow).toEqual(0)
        animation.elapsedTime = 2
        expect(animation.overflow).toEqual(1)
    })

})
