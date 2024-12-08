import { ObjectGenerator } from '../Generators/ObjectGenerator.js';
import { BooleanGenerator } from '../Generators/BooleanGenerator.js';
import { GenerationCore } from '../Generators/GenerationCore.js';

// The ObjectGenerator class is tested.
// Check that if properties are missing or invalid, the generator returns null.
// Check that required properties are always generated with valid schemas.
// Check that both required and optional properties are correctly handled in the same schema.
// Check the behavior when required properties do not have a correct schema.
// Simulates a BooleanGenerator to check for accidental inclusion of optional properties.
// Simulates a GenerationCore to generate expected objects.

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

    //Test correct object generation when schema is empty object. Expected result is null
    it('should return null if schema has no properties', () => {
        // Init schema
        const schema = {};

        // Generate an object
        const result = generator.Generate(schema);

        expect(Object.keys(result)).toHaveLength(0);
    });

    //Test correct object generation when schema is correct and all properties is required.
    //Expected result all required properties is exists.
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
                StartGeneration: jest.fn((propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'generatedString';
                        case 'integer': return 42;
                        default: return null;
                    }
                }),
            };
        });

        // Generate an object
        const result = generator.Generate(schema);

        expect(result).toEqual({
            name: 'generatedString',
            age: 42,
        });
    });

    //Test correct object generation when the schema is correct and there are no required properties. 
    //Expected result: not all properties may exist.
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
                StartGeneration: jest.fn((propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'generatedString';
                        case 'boolean': return true;
                        default: return null;
                    }
                }),
            };
        });

        // Generate an object
        const result = generator.Generate(schema);

        expect(result).toEqual({
            // Generated because BooleanGenerator returned true
            isActive: true,
        });
    });

    //Test correct object generation when the schema is correct and the required properties exist.
    //Expected result: required properties must exist.
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
                StartGeneration: jest.fn((propSchema) => {
                    switch (propSchema.type) {
                        case 'string': return 'requiredName';
                        case 'boolean': return true;
                        default: return null;
                    }
                }),
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

    //Test correct object generation when schema is uncorrect, Properties is empty. 
    //Expected result is null.
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
