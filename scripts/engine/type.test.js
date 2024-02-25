import Type from './type'


describe(Type, () => {

    test('integration', () => {
        class TestType extends Type {}
        Type.addType(TestType)
        expect(Type.getType('TestType')).toBe(TestType)
    })

})
