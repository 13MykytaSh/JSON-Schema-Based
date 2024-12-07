import { NumberGenerator } from '../Generators/NumberGenerator.js';
import { GetRandomNumberBetween } from '../Utils/RandomNumber.js';
import { GetValidValueBetween } from '../Utils/ValueValidator.js';

// Mocking utility functions to ensure controlled tests
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

    test('should return null when minimum is greater than maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        
        // Generate a number
        const schema = { minimum: 60, maximum: 30 };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    test('should return null when minimum and maximum are equal', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        
        // Generate a number
        const schema = { minimum: 30, maximum: 30 };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

    test('should generate a number within default min and max when schema has no min or max', () => {
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

    test('should return null when schema contains non-numeric minimum and maximum', () => {
        // Mock GetValidValueBetween to return specific values
        GetValidValueBetween.mockImplementation((input, defaultValue) => input);
        
        // Generate a number
        const schema = { minimum: 'ten', maximum: 'fifty' };
        const result = generator.Generate(schema);

        expect(result).toBeNull();
        expect(GetRandomNumberBetween).not.toHaveBeenCalled();
    });

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
