import { NumberGenerator } from '../Generators/NumberGenerator.js';
import { GetRandomNumberBetween } from '../Utils/RandomNumber.js';
import { GetValidValueBetween } from '../Utils/ValueValidator.js';

// The NumberGenerator class is tested.
// Checks that the generator correctly returns a random number within the specified minimum and maximum when provided.
// Checks with an invalid range (min > max)
// Checks that the generator returns null if the minimum value is greater than the maximum.
// Checks that if schema values ​​are not provided, the generator uses the default values ​​MIN_VALUE (0) and MAX_VALUE (1000).
// Checks that if the schema contains non-numeric minimum or maximum values, the generator correctly returns null.

// Mocking utility functions to ensure controlled tests
jest.mock('../Utils/RandomNumber.js');
jest.mock('../Utils/ValueValidator.js');

describe('NumberGenerator', () => {

    let generator;

    beforeEach(() => {
        // Create a new instance of NumberGenerator before each test
        generator = new NumberGenerator();
    });

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    // Test correct floating-point number generation with correct range
    test('should generate a number within the given schema minimum and maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(35);
        
        // Generate a number
        const schema = { minimum: 10, maximum: 50 };
        const result = generator.Generate(schema);

        expect(result).toBe(35);
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(10, 50);
    });

    // Test correct floating-point number generation with uncorrect range. Expected result is null
    test('should return null when minimum is greater than maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        
        // Generate a number
        const schema = { minimum: 60, maximum: 30 };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    // Test correct floating-point number generation with the same parameters minimum and maximum. Expected result is value equal to minimum and maximum
    test('should return null when minimum and maximum are equal', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(30);
        // Generate a number
        const schema = { minimum: 30, maximum: 30 };
        const result = generator.Generate(schema);

        expect(result).toBe(30);
    });

    // Test correct floating-point number generation with default range
    test('should generate a number within default minimum and maximum when schema has no minimum or maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => defaultValue);
        // Mock GetRandomNumberBetween to return a fixed number
        GetRandomNumberBetween.mockReturnValue(500);
        
        // Generate a number
        const schema = {};
        const result = generator.Generate(schema);

        expect(result).toBe(500);
        expect(GetRandomNumberBetween).toHaveBeenCalledWith(0, 1000);
    });

    // Test correct floating-point number generation with uncorrect minimum and maximum. Expected result is null
    test('should return null when schema contains non-numeric minimum and maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        
        // Generate a number
        const schema = { minimum: 'ten', maximum: 'fifty' };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    // Test correct floating-point number generation with uncorrect minimum or maximum. Expected result is null
    test('should return null when schema contains non-numeric minimum or maximum', () => {
        //Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);

        //Make the second parameter not a number
        const schemaF = { minimum: 10, maximum: 'fifty' };
        const resultF = generator.Generate(schemaF);

        expect(resultF).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();

        //Make the first parameter not a number
        const schemaS = { minimum: 'ten', maximum: 50 };
        const resultS = generator.Generate(schemaS);

        expect(resultS).toBeNull();
        expect(GetValidValueBetween).toHaveBeenCalledTimes(4);
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });
});
