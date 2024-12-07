import { ArrayGenerator } from '../Generators/ArrayGenerator.js';

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

    it('should generate an array of integers', () => {
        // Init schema
        const schema = {
            items: { type: 'integer' },
            minItems: 2,
            maxItems: 5,
        };
        // Generate an array of integer
        const result = generator.Generate(schema);

        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(5);
        result.forEach(item => {
            expect(typeof item).toBe('number');
        });
    });

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

        expect(result.length).toBeGreaterThanOrEqual(3);
        expect(result.length).toBeLessThanOrEqual(5);
        expect(new Set(result).size).toBe(result.length); // Check uniqueness
    });

    it('should generate an array of string', () => {
        // Init schema
        const schema = {
            items: { type: 'string' },
            minItems: 2,
            maxItems: 4,
        };
        // Generate an array of string
        const result = generator.Generate(schema);

        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(4);
        result.forEach(item => {
            expect(typeof item).toBe('string');
        });
    });
    it('should generate an array of boolean', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: 2,
            maxItems: 4,
        };
        // Generate an array of string
        const result = generator.Generate(schema);

        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(4);
        result.forEach(item => {
            expect(typeof item).toBe('boolean');
        });
    });

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

    it('should return an empty array if schema is invalid', () => {
        // Init schema
        const schema = {
            items: null, // Invalid items schema
        };
        // Generate an invalid array 
        const result = generator.Generate(schema);

        expect(result).toEqual([]);
    });

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

        expect(result).toEqual([]);
    });

    it('should return an empty array for negative minItems value', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: -5,
            maxItems: 0,
        };
        // Generate an invalid array of boolean
        const result = generator.Generate(schema);

        expect(result).toEqual([]);
    });

    it('should return an empty array for incorrect minItems value and maxItems value. maxItems < minItems', () => {
        // Init schema
        const schema = {
            items: { type: 'boolean' },
            minItems: 7,
            maxItems: 2,
        };
        // Generate an invalid array of boolean
        const result = generator.Generate(schema);

        expect(result).toEqual([]);
    });


});
