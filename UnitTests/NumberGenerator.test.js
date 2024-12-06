// NumberGenerator.test.js
import { NumberGenerator } from '../Generators/NumberGenerator.js';
import { GetRandomNumberBetween } from '../Utils/RandomNumber.js';
import { GetValidValueBetween } from '../Utils/ValueValidator.js';

// Mock the utility functions to control their behavior
jest.mock('../Utils/RandomNumber.js');
jest.mock('../Utils/ValueValidator.js');

describe('NumberGenerator', () => {

    let generator;

    beforeEach(() => {
        generator = new NumberGenerator();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test 1: Valid schema with minimum and maximum values provided.
     * Ensures that the generator returns a random number within the specified range.
     */
    test('should generate a number within the given schema minimum and maximum', () => {
        const schema = { minimum: 10, maximum: 50 };

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(35);

        const result = generator.Generate(schema);

        expect(result).toBe(35);
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(10, 50);
    });

    /**
     * Test 2: Schema where minimum is greater than the maximum.
     * Should return `null` due to an invalid range.
     */
    test('should return null when minimum is greater than maximum', () => {
        const schema = { minimum: 60, maximum: 30 };

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    /**
    * Test 3: Schema where minimum and maximum are equal.
    * Should return `null` due to an invalid range.
    */
    test('should return null when minimum and maximum are equal', () => {
        const schema = { minimum: 30, maximum: 30 };

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    /**
     * Test 5: Schema with no minimum and maximum values provided.
     * Should use default values (0 and 1000).
     */
    test('should generate a number within default min and max when schema has no min or max', () => {
        const schema = {};

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => defaultValue);
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(500);

        const result = generator.Generate(schema);

        expect(result).toBe(500);
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(0, 1000);
    });

    /**
     * Test 6: Schema with non-numeric inputs for `minimum` and `maximum`.
     * Should return `null` since inputs are invalid.
     */
    test('should return null when schema contains non-numeric minimum and maximum', () => {
        const schema = { minimum: 'ten', maximum: 'fifty' };

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    /**
    * Test 7: Schema with non-numeric inputs for `minimum` or `maximum`.
    * Should return `null` since inputs are invalid.
    */
    test('should return null when schema contains non-numeric minimum or maximum', () => {
        const schemaF = { minimum: 10, maximum: 'fifty' };

        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        const resultF = generator.Generate(schemaF);

        expect(resultF).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(2);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();

        const schemaS = { minimum: 'ten', maximum: 50 };
        const resultS = generator.Generate(schemaS);

        expect(resultS).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(4);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });
});
