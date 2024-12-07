import { BooleanGenerator } from '../Generators/BooleanGenerator.js';

// The BooleanGenerator class is tested.
// The correctness of the generation of the boolean is tested both for single and multiple calls on one instance.
describe('BooleanGenerator', () => {
    let generator;

    beforeEach(() => {
        // Create a new instance of BooleanGenerator before each test
        generator = new BooleanGenerator();
    });

    // Check the correct generation in a single call.
    it('should generate a boolean value', () => {
        // Generate a boolean
        const result = generator.Generate();

        // Ensure the result is a boolean
        expect(typeof result).toBe('boolean');
    });

    // Check the correct generation in case of multiple calls.
    it('should return different values on subsequent calls', () => {
        // Generate a booleans
        // Ensure the result is a boolean
        expect(typeof generator.Generate()).toBe('boolean');
        expect(typeof generator.Generate()).toBe('boolean');
        expect(typeof generator.Generate()).toBe('boolean');
    });
});
