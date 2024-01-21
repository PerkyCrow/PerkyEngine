import NotifierProxy from './notifier_proxy'
import Notifier from './notifier'
import jest from 'jest-mock'


describe(NotifierProxy, () => {

    let target
    let proxy

    beforeEach(() => {
        target = new Notifier()
        proxy = new NotifierProxy({target})
    })


    test('constructor', () => {
        expect(proxy.target).toEqual(target)
    })


    test('on', () => {
        const listener = jest.fn()
        proxy.on('test', listener)
        target.emit('test')
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('off', () => {
        const listener = jest.fn()
        proxy.on('test', listener)
        proxy.off('test', listener)
        target.emit('test')
        expect(listener).toHaveBeenCalledTimes(0)
    })


    test('emit', () => {
        const listener = jest.fn()
        proxy.on('test', listener)
        proxy.emit('test')
        expect(listener).toHaveBeenCalledTimes(1)
    })


    test('removeListenersFor', () => {
        const listener = jest.fn()
        proxy.on('test', listener)
        proxy.removeListenersFor('test')
        target.emit('test')
        expect(listener).toHaveBeenCalledTimes(0)
    })


    test('removeListeners', () => {
        const listener = jest.fn()
        const listener2 = jest.fn()
        target.on('test', listener2)
        proxy.on('test', listener)
        proxy.removeListeners()
        target.emit('test')
        expect(listener).toHaveBeenCalledTimes(0)
        expect(listener2).toHaveBeenCalledTimes(1)
    })

})
