import { StringGenerator } from '../Generators/StringGenerator.js';
import { GetRandomNumberBetween, GetIntRandomNumberUpTo } from '../Utils/RandomNumber.js';

// Mocking utility functions to ensure controlled tests
jest.mock('../Utils/RandomNumber', () => ({
    GetIntRandomNumberUpTo: jest.fn(),
    GetRandomNumberBetween: jest.fn(),
}));

describe('StringGenerator', () => {

    let generator;

    beforeEach(() => {
        // Create a new instance of StringGenerator before each test
        generator = new StringGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    test('Should generate a string within the specified length range', () => {
        // Length of the string
        GetRandomNumberBetween.mockReturnValue(5);
        // First character from `characters`
        GetIntRandomNumberUpTo.mockReturnValue(0);

        // Generate a string
        const schema = { minLength: 5, maxLength: 10 };
        const result = generator.Generate(schema);

        expect(result).toHaveLength(5);
        //Check if the string contains characters used for string generation
        expect(result).toMatch(/^[A-Za-z0-9]+$/);
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(5, 10);
    });

    test('Should return null for invalid schema (minLength >= maxLength)', () => {
        // Generate a string
        const schema = { minLength: 10, maxLength: 5 };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
    });

    test('Should use default min and max length if schema is empty', () => {
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(100);

        // Generate a string
        const schema = {};
        const result = generator.Generate(schema);

        expect(result).toHaveLength(100);
        // Check default values
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(1, 256);
    });

    test('should return null when schema contains non-numeric minimum or maximum', () => {
        //Make the second parameter not a number
        const schemaF = { minLength: 'five', maxLength: 10 };
        const resultF = generator.Generate(schemaF);
        expect(resultF).toBeNull();

        //Make the first parameter not a number
        const schemaS = { minLength: 5, maxLength: 'ten' };
        const resultS = generator.Generate(schemaS);
        expect(resultS).toBeNull();
    });

    test('Should generate a string with characters from the predefined set', () => {
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(5);
        //Get 5 leters from characters used for string generation
        GetIntRandomNumberUpTo.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3).mockReturnValueOnce(4).mockReturnValueOnce(5);

        // Generate a string
        const schema = { minLength: 5, maxLength: 10 };
        const result = generator.Generate(schema);

        // Use mock values ​​from GetIntRandomNumberUpTo
        expect(result).toBe('BCDEF');
    });
});
