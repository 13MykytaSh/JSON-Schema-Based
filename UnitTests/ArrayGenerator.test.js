import { ArrayGenerator } from '../Generators/ArrayGenerator.js';


// Tests if the generator correctly creates an array of integers/strings/booleans within the specified range of minItems and maxItems.
// Create an array of unique items if uniqueItems is true.
// Validates that the array contains no duplicates.
// Tests a specific edge case where generating unique booleans fails if the length exceeds the two possible values (true and false).
// Handles cases where the schema is invalid or incomplete, returning an empty array.
// Validates the behavior when the schema specifies a range too small to generate the required number of unique integers.

describe('ArrayGenerator', () => {
    let generator;

    beforeEach(() => {
        // Create a new instance of ArrayGenerator before each test
        generator = new ArrayGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    // Test correct generation an array of integers
    it('should generate an array of integers', () => {
        // Init schema
        const schema = {
            items: { type: 'integer' },
            minItems: 2,
            maxItems: 5,
        };
        // Generate an array of integer
        const result = generator.Generate(schema);
        // Check generation bounds
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(5);
        // Check items type
        result.forEach(item => {
            expect(typeof item).toBe('number');
        });
    });

    // Test correct generation an array of unique integers
    it('should generate an array of unique integers', () => {
        // Init schema
        const schema = {
            items: { type: 'integer', minimum: 0, maximum: 10 },
            minItems: 3,
            maxItems: 5,
            uniqueItems: true,
        };
        // Generate an array of unique integer
        const result = generator.Generate(schema);
        // Check generation bounds
        expect(result.length).toBeGreaterThanOrEqual(3);
        expect(result.length).toBeLessThanOrEqual(5);
        // Check uniqueness
        expect(new Set(result).size).toBe(result.length); // Check uniqueness
    });

    // Test correct generation an array of string
    it('should generate an array of string', () => {
        // Init schema
        const schema = {
            items: { type: 'string' },
            minItems: 2,
            maxItems: 4,
        };
        // Generate an array of string
        const result = generator.Generate(schema);
        // Check generation bounds
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(4);
        // Check items type
        result.forEach(item => {
            expect(typeof item).toBe('string');
        });
    });

    // Test correct generation an array of boolean
    it('should generate an array of boolean', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: 2,
            maxItems: 4,
        };
        // Generate an array of string
        const result = generator.Generate(schema);

        // Check generation bounds
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(4);
        // Check items type
        result.forEach(item => {
            expect(typeof item).toBe('boolean');
        });
    });

    // Test generating an empty array when the number of elements needed is greater than can be generated
    it('should handle unique integers with limited range', () => {
        // Init schema
        const schema = {
            items: { type: 'integer', minimum: 0, maximum: 2 },
            minItems: 3,
            maxItems: 3,
            uniqueItems: true,
        };
        // Generate an array of integer
        const result = generator.Generate(schema);
        // Cannot generate more unique integers than the range
        expect(result).toEqual([]);
    });

    //Test generating an empty array when items: null
    it('should return an empty array if schema is invalid', () => {
        // Init schema
        const schema = {
            items: null, // Invalid items schema
        };
        // Generate an invalid array 
        const result = generator.Generate(schema);
        // expected []
        expect(result).toEqual([]);
    });

    //Test generating an empty array when items: { type: 'boolean' } minItems more than 2 and uniqueItems: true
    it('should return an empty array for invalid boolean schema with uniqueItems', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: 3,
            maxItems: 5,
            uniqueItems: true,
        };
        // Generate an invalid array of boolean
        const result = generator.Generate(schema);
        // expected []
        expect(result).toEqual([]);
    });

    //Test generating an empty array when minItems <=0 and as a result the length for generation is 0
    it('should return an empty array for negative minItems value', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: -5,
            maxItems: 0,
        };
        // Generate an invalid array of boolean
        const result = generator.Generate(schema);
        // expected []
        expect(result).toEqual([]);
    });

    //Test generating an empty array when minItems more than maxItems
    it('should return an empty array for incorrect minItems value and maxItems value. maxItems < minItems', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: 7,
            maxItems: 2,
        };
        // Generate an invalid array of boolean
        const result = generator.Generate(schema);
        // expected []
        expect(result).toEqual([]);
    });


});
