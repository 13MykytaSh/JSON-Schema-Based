import { EnumGenerator } from '../Generators/EnumGenerator.js';
import { GetIntRandomNumberUpTo } from '../Utils/RandomNumber.js';

// Mocking utility functions to ensure controlled tests
jest.mock('../Utils/RandomNumber', () => ({
    GetIntRandomNumberUpTo: jest.fn(),
}));

describe('EnumGenerator', () => {
    let generator;

    beforeEach(() => {
        // Create a new instance of EnumGenerator before each test
        generator = new EnumGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    it('should return a value from the enum', () => {
        // Init schema
        const schema = { enum: ['red', 'green', 'blue'] };
        // Mock the random number to always return index 1
        GetIntRandomNumberUpTo.mockReturnValue(1);

        // Generate a value from enum
        const result = generator.Generate(schema);

        // Ensure the selected value matches the mocked index
        expect(result).toBe('green');
        // Verify function call
        expect(GetIntRandomNumberUpTo).toHaveBeenCalledWith(schema.enum.length - 1);
    });

    it('should return null for an invalid schema', () => {
        // Init schema
        const invalidSchemas = [
            {}, // Missing 'enum'
            { enum: [] }, // Empty 'enum' array
            { enum: null }, // Null 'enum'
            { enum: 'not an array' }, // Invalid type
        ];

        invalidSchemas.forEach((schema) => {
            // Generate a value from enum
            const result = generator.Generate(schema);

            // Ensure null is returned for invalid schemas
            expect(result).toBeNull();
        });
    });

    it('should handle enums with one value', () => {
        // Init schema
        const schema = { enum: ['singleValue'] };
        // Mock the random number to always return index 0
        GetIntRandomNumberUpTo.mockReturnValue(0);

        // Generate a value from enum
        const result = generator.Generate(schema);

        expect(result).toBe('singleValue');
    });

    it('should generate values from the enum randomly', () => {
        // Init schema
        const schema = { enum: ['cat', 'dog', 'mouse'] };
        // Simulate multiple random outputs
        const mockIndices = [0, 2, 1]; 
        GetIntRandomNumberUpTo.mockImplementation(() => mockIndices.shift());

        // Generate a value from enum
        // Ensure the result is a correct
        expect(generator.Generate(schema)).toBe('cat');
        expect(generator.Generate(schema)).toBe('mouse');
        expect(generator.Generate(schema)).toBe('dog');
    });

    it('should not call the random function if the enum is invalid', () => {
        // Init schema
        const schema = { enum: [] };

        // Generate a value from enum
        const result = generator.Generate(schema);

        expect(result).toBeNull();
         // Verify no calls were made
        expect(GetIntRandomNumberUpTo).not.toHaveBeenCalled();
    });
});
