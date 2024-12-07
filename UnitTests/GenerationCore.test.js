import { GenerationCore } from '../Generators/GenerationCore.js';
import { EnumGenerator } from '../Generators/EnumGenerator.js';
import { StringGenerator } from '../Generators/StringGenerator.js';
import { NumberGenerator } from '../Generators/NumberGenerator.js';
import { IntegerGenerator } from '../Generators/IntegerGenerator.js';
import { BooleanGenerator } from '../Generators/BooleanGenerator.js';
import { ArrayGenerator } from '../Generators/ArrayGenerator.js';
import { ObjectGenerator } from '../Generators/ObjectGenerator.js';

// Mocking all generators
jest.mock('../Generators/EnumGenerator');
jest.mock('../Generators/StringGenerator');
jest.mock('../Generators/NumberGenerator');
jest.mock('../Generators/IntegerGenerator');
jest.mock('../Generators/BooleanGenerator');
jest.mock('../Generators/ArrayGenerator');
jest.mock('../Generators/ObjectGenerator');

describe('GenerationCore', () => {
    let core;

    beforeEach(() => {

        core = new GenerationCore();

        // Set up basic mocked implementations for generator instances
        EnumGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => 'green'),
        }));
        StringGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => 'generatedString'),
        }));
        NumberGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => 42.42),
        }));
        IntegerGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => 42),
        }));
        BooleanGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => true),
        }));
        ArrayGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => [1, 2, 3]),
        }));
        ObjectGenerator.mockImplementation(() => ({
            Generate: jest.fn(() => ({ key: 'generatedString' })),
        }));
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    it('should generate data for "enum"', () => {
        // Init schema
        const schema = { enum: ['red', 'green', 'blue'] };
        // Generate an enum value
        const result = core.StartGeneration(schema);

        expect(result).toBe('green');
        expect(EnumGenerator).toHaveBeenCalled();
    });

    it('should generate data for "string"', () => {
        // Init schema
        const schema = { type: 'string', minLength: 5, maxLength: 10 };
        // Generate a string
        const result = core.StartGeneration(schema);

        expect(result).toBe('generatedString');
        expect(StringGenerator).toHaveBeenCalled();
    });

    it('should generate data for "number"', () => {
        // Init schema
        const schema = { type: 'number', minimum: 10, maximum: 100 };
        // Generate a number
        const result = core.StartGeneration(schema);

        expect(result).toBe(42.42);
        expect(NumberGenerator).toHaveBeenCalled();
    });

    it('should generate data for "integer"', () => {
        // Init schema
        const schema = { type: 'integer', minimum: 1, maximum: 100 };
        // Generate an integer
        const result = core.StartGeneration(schema);

        expect(result).toBe(42);
        expect(IntegerGenerator).toHaveBeenCalled();
    });

    it('should generate data for "boolean"', () => {
        // Init schema
        const schema = { type: 'boolean' };
        // Generate a boolean
        const result = core.StartGeneration(schema);

        expect(result).toBe(true);
        expect(BooleanGenerator).toHaveBeenCalled();
    });

    it('should generate data for "array"', () => {
        // Init schema
        const schema = { type: 'array', items: { type: 'integer' }, minItems: 2, maxItems: 5 };
        // Generate an array
        const result = core.StartGeneration(schema);

        expect(result).toEqual([1, 2, 3]);
        expect(ArrayGenerator).toHaveBeenCalled();
    });

    it('should generate data for "object"', () => {
        // Init schema
        const schema = {
            type: 'object',
            properties: {
                key: { type: 'string', minLength: 3, maxLength: 20 },
            },
            required: ['key'],
        };
        // Generate an object
        const result = core.StartGeneration(schema);

        expect(result).toEqual({ key: 'generatedString' });
        expect(ObjectGenerator).toHaveBeenCalled();
    });

    it('should return null for invalid schema', () => {
        // Init schema
        const schema = null;
        // Generate an object
        const result = core.StartGeneration(schema);
        expect(result).toBeNull();
    });

    it('should return null for unsupported type', () => {
        // Init schema
        const schema = { type: 'unsupported' };
        // Generate an object
        const result = core.StartGeneration(schema);

        expect(result).toBeNull();
    });

    it('should return null for empty schema', () => {
        // Init schema
        const schema = {};
        // Generate an object
        const result = core.StartGeneration(schema);

        expect(result).toBeNull();
    });
});
