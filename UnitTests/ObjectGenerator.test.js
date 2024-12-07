import { ObjectGenerator } from '../Generators/ObjectGenerator.js';
import { BooleanGenerator } from '../Generators/BooleanGenerator.js';
import { GenerationCore } from '../Generators/GenerationCore.js';

// Mocking classes to ensure controlled tests
jest.mock('../Generators/BooleanGenerator.js');
jest.mock('../Generators/GenerationCore.js');

describe('ObjectGenerator', () => {
    let generator;

    beforeEach(() => {
        // Create a new instance of ObjectGenerator before each test
        generator = new ObjectGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    it('should return null if schema has no properties', () => {
        // Init schema
        const schema = {};

        // Generate an object
        const result = generator.Generate(schema);

        expect(Object.keys(result)).toHaveLength(0);
    });

    it('should generate an object with required properties only', () => {
        // Init schema
        const schema = {
            properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
            },
            required: ['name', 'age'],
        };

        // Mocking classs and function to ensure controlled tests
        GenerationCore.mockImplementation(() => {
            return {
                // Change logic for StartGeneration this will help to get the required values
                StartGeneration: (propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'generatedString';
                        case 'integer': return 42;
                        default: return null;
                    }
                },
            };
        });

        // Generate an object
        const result = generator.Generate(schema);

        expect(result).toEqual({
            name: 'generatedString',
            age: 42,
        });
    });

    it('should generate an object with optional properties based on BooleanGenerator', () => {
        // Init schema
        const schema = {
            properties: {
                isActive: { type: 'boolean' },
                name: { type: 'string' },
            },
        };

        // Mocking classs and function to ensure controlled tests
        BooleanGenerator.mockImplementation(() => {
            return {
                //Generate isActive => true, name => false
                Generate: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
            };
        });
        // Mocking classs and function to ensure controlled tests
        GenerationCore.mockImplementation(() => {
            return {
                // Change logic for StartGeneration this will help to get the required values
                StartGeneration: (propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'generatedString';
                        case 'boolean': return true;
                        default: return null;
                    }
                },
            };
        });

        // Generate an object
        const result = generator.Generate(schema);

        expect(result).toEqual({
            // Generated because BooleanGenerator returned true
            isActive: true,
        });
    });

    it('should handle required and optional properties', () => {
        // Init schema
        const schema = {
            properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
                isActive: { type: 'boolean' },
            },
            required: ['name'],
        };

        // Mocking classs and function to ensure controlled tests
        // Optional isActive is included
        BooleanGenerator.mockImplementation(() => {
            return {
                //Generate age => false, isActive => true
                Generate: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true)
            };
        });
        // Mocking classs and function to ensure controlled tests
        GenerationCore.mockImplementation(() => {
            return {
                // Change logic for StartGeneration this will help to get the required values
                StartGeneration: (propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'requiredName';
                        case 'boolean': return true;
                        default: return null;
                    }
                },
            };
        });

        // Generate an object
        const result = generator.Generate(schema);

        expect(result).toEqual({
            name: 'requiredName',
            // Optional but included because BooleanGenerator returned true
            isActive: true,
        });
    });

    it('should return null for required properties without a schema', () => {
        // Init schema
        const schema = {
            properties: {},
            required: ['missingProp'],
        };

        // Generate an object
        const result = generator.Generate(schema);

        // Must be null for required properties without a schema
        expect(result).toEqual({ missingProp: null });
    });
});
