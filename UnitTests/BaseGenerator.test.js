import { BaseGenerator } from '../Generators/BaseGenerator.js';

describe('BaseGenerator', () => {

    let generator;

    beforeEach(() => {
        generator = new BaseGenerator();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should create an instance of BaseGenerator', () => {
        expect(generator).toBeInstanceOf(BaseGenerator);
    });

    test('Should have a Generate method', () => {
        expect(typeof generator.Generate).toBe('function');
    });

    test('Generate method should not throw by default', () => {
        expect(() => generator.Generate({})).not.toThrow();
    });

    test('Generate method should not return any value by default', () => {
        const result = generator.Generate({});
        expect(result).toBeUndefined();
    });
});
