import Sprite from './sprite'
import ObservableVector2 from '../observable_vector_2'
import jest from 'jest-mock'


describe(Sprite, () => {

    let sprite

    beforeEach(() => {
        sprite = new Sprite()
    })


    test('attributes', () => {
        expect(sprite.width).toBe(1)
        expect(sprite.height).toBe(1)

        expect(sprite.anchor).toBeInstanceOf(ObservableVector2)
        expect(sprite.anchor.x).toBe(0)
        expect(sprite.anchor.y).toBe(0)

        expect(sprite.texture).toBe(undefined)

        sprite.width = 2
        expect(sprite.width).toBe(2)

        const widthChanged = jest.fn()
        sprite.on('changed:width', widthChanged)
        sprite.width = 3
        expect(widthChanged).toHaveBeenCalledTimes(1)
    })


    test('isSprite', () => {
        expect(sprite.isSprite).toBe(true)
    })
    
})
