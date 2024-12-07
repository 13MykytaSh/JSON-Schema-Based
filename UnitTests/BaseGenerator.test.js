import { BaseGenerator } from '../Generators/BaseGenerator.js';

// The BaseGenerator class is tested.
// Checks that BaseGenerator is created without errors.
// Checks that the Generate method is available on the class instance.
// Checks that calling Generate does not throw exception.
// Checks that the base method does not return anything.

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

    // Checks that the Generate method is available on the class instance.
    test('Should have a Generate method', () => {
        expect(typeof generator.Generate).toBe('function');
    });

    // Checks that calling Generate does not throw exception.
    test('Generate method should not throw by default', () => {
        expect(() => generator.Generate({})).not.toThrow();
    });
    // Checks that the base method does not return anything.
    test('Generate method should not return any value by default', () => {
        const result = generator.Generate({});
        expect(result).toBeUndefined();
    });
});
