import AnimationLoop from './animation_loop'


describe(AnimationLoop, () => {

    let globalElapsedTime

    function requestNext (callback) {
        globalElapsedTime += 1
        setTimeout(() => callback(globalElapsedTime))
    }


    let animationLoop

    beforeEach(function () {
        globalElapsedTime = 0

        if (animationLoop) {
            animationLoop.stop()
        }
        animationLoop = new AnimationLoop({requestNext})
    })


    test('start', () => {
        animationLoop.start()
        expect(animationLoop.started).toBeTruthy()
        expect(animationLoop.lastElapsedTime).toEqual(1)
    })


    test('pause', () => {
        animationLoop.start()
        animationLoop.pause()

        expect(animationLoop.started).toBeTruthy()
        expect(animationLoop.paused).toBeTruthy()
    })


    test('resume', () => {
        animationLoop.start()
        animationLoop.pause()
        animationLoop.resume()
        expect(animationLoop.started).toBeTruthy()
        expect(animationLoop.paused).toBeFalsy()

        animationLoop.stop()
    })

})
