import { BaseGenerator } from '../Generators/BaseGenerator.js';

describe('BaseGenerator', () => {

    let generator;

    beforeEach(() => {
        // Create a new instance of BaseGenerator before each test
        generator = new BaseGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
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
