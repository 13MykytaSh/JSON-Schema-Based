import { BooleanGenerator } from '../Generators/BooleanGenerator.js';

describe('BooleanGenerator', () => {
    let generator;

    beforeEach(() => {
        // Create a new instance of BooleanGenerator before each test
        generator = new BooleanGenerator();
    });

    it('should generate a boolean value', () => {
        // Generate a boolean
        const result = generator.Generate();

        // Ensure the result is a boolean
        expect(typeof result).toBe('boolean');
    });

    it('should return different values on subsequent calls', () => {
        // Generate a booleans
        // Ensure the result is a boolean
        expect(typeof generator.Generate()).toBe('boolean');
        expect(typeof generator.Generate()).toBe('boolean');
        expect(typeof generator.Generate()).toBe('boolean');
    });
});
